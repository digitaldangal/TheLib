/* eslint-disable */
import mongoose from 'mongoose';
import frontmatter from 'front-matter';

import getRootUrl from '../../lib/api/getRootUrl';
import Chapter from './Chapter';
import Purchase from './Purchase';
import getEmailTemplate from './EmailTemplate';
import User from './User';

import { stripeCharge } from '../stripe';
import { getCommits, getContent } from '../github';
import sendEmail from '../aws';
import { subscribe } from '../mailchimp';

import generateSlug from '../utils/slugify';
import logger from '../logs';

// const ROOT_URL = process.env.ROOT_URL || http://localhost:${process.env.PORT || 8000};
const ROOT_URL = getRootUrl();

const { Schema } = mongoose;

const bookSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  githubRepo: {
    type: String,
    required: true,
  },
  githubLastCommitSha: String,

  createdAt: {
    type: Date,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

class BookClass {
  // list() grabs a list of all available/purchased books
  static async list({ offset = 0, limit = 10 } = {}) {
    const books = await this.find({})
      .sort({ createdAt: -1 }) // sort book objects by creation date, from most to least created
      .skip(offset) // make sure I don't skip any books
      .limit(limit); // limit my book returns to no more than 10 to speed up query time
    return { books };
  }
  // getBySlug() will display a single book by searching 1 unique book by it's slug.
  static async getBySlug({ slug }) {
    const bookDoc = await this.findOne({ slug });
    if (!bookDoc) {
      throw new Error('Book not found'); // throw error if book can't be found
    }
    // convert the book doc into plain a plain JS obj if a book is found
    const book = bookDoc.toObject();
    // Retrieve chapters for table of contents
    book.chapters = (await Chapter.find({ bookId: book._id }, 'title slug').sort({ order: 1 })).map(chapter => chapter.toObject());
    return book;
  }
  // add() adds a new book to the Book collection
  static async add({ name, price, githubRepo }) {
    const slug = await generateSlug(this, name);

    if (!slug) {
      throw new Error('Error with slug generation');
    }

    return this.create({
      name,
      slug,
      price,
      githubRepo,
      createdAt: new Date(),
    });
  }
  // edit() finds/edits a book by name,pr,repo - ADMIN only
  static async edit({
    id, name, price, githubRepo,
  }) {
    const book = await this.findById(id, 'slug name');

    if (!book) {
      throw new Error('Book is not found by id');
    }

    const modifier = { price, githubRepo };

    if (name !== book.name) {
      modifier.name = name;
      modifier.slug = await generateSlug(this, name);
    }
    // Mongo's $set operator will replace the value of (name,slug,price,githubRepo) w/ new vals
    await this.updateOne({ _id: id }, { $set: modifier });
    const editedBook = await this.findById(id, 'slug');
    return editedBook;
  }

  static async syncContent({ id, githubAccessToken }) {
    const book = await this.findById(id, 'githubRepo githubLastCommitSha');

    if (!book) {
      throw new Error('Book not found');
    }

    const lastCommit = await getCommits({
      accessToken: githubAccessToken,
      repoName: book.githubRepo,
      limit: 1,
    });

    if (!lastCommit || !lastCommit.data || !lastCommit.data[0]) {
      throw new Error('No change in content!');
    }

    const lastCommitSha = lastCommit.data[0].sha;
    if (lastCommitSha === book.githubLastCommitSha) {
      throw new Error('No change in content!');
    }

    const mainFolder = await getContent({
      accessToken: githubAccessToken,
      repoName: book.githubRepo,
      path: '',
    });

    await Promise.all(mainFolder.data.map(async (f) => {
      if (f.type !== 'file') {
        return;
      }

      if (f.path !== 'introduction.md' && !/chapter-([0-9]+)\.md/.test(f.path)) {
        return;
      }

      const chapter = await getContent({
        accessToken: githubAccessToken,
        repoName: book.githubRepo,
        path: f.path,
      });

      const data = frontmatter(Buffer.from(chapter.data.content, 'base64').toString('utf8'));

      data.path = f.path;

      try {
        await Chapter.syncContent({ book, data });
        logger.info('Content is synced', { path: f.path });
      } catch (error) {
        logger.error('Content sync has error', { path: f.path, error });
      }
    }));

    return book.update({ githubLastCommitSha: lastCommitSha });
  }

  static async buy({ id, user, stripeToken }) {
    if (!user) {
      throw new Error('User required');
    }
    // return name, slug and price
    const book = await this.findById(id, 'name slug price');

    if (!book) {
      throw new Error('Book not found');
    }

    // Checks the DB to see if a user bought a book already to avoid from buying it twice.
    // true is greater than 0
    const isPurchased = (await Purchase.find({ userId: user._id, bookId: id }).count()) > 0;
    if (isPurchased) {
      throw new Error('Already bought this book');
    }
    // StripeCharge() is saved in chargeObj
    const chargeObj = await stripeCharge({
      amount: book.price * 100,
      token: stripeToken.id,
      buyerEmail: user.email,
    });
    // Find and update a user who purchased a book
    User.findByIdAndUpdate(user.id, { $addToSet: { purchasedBookIds: book.id } }).exec();

    const template = await getEmailTemplate('purchase', {
      userName: user.displayName,
      bookTitle: book.name,
      bookUrl: `${ROOT_URL}/books/${book.slug}/introduction`,
    });

    try {
      await sendEmail({
        from: `Ruben from thelib.tech <${process.env.EMAIL_SUPPORT_FROM_ADDRESS}>`,
        to: [user.email],
        subject: template.subject,
        body: template.message,
      });
    } catch (error) {
      logger.error('Email sending error:', error);
    }

    try {
      await subscribe({ email: user.email });
    } catch (error) {
      logger.error('Mailchimp error:', error);
    }

    // create new Purchase document in the DB
    return Purchase.create({
      userId: user._id,
      bookId: book._id,
      amount: book.price * 100,
      createdAt: new Date(),
      stripeCharge: chargeObj,
    });
  }

  static async getPurchasedBooks({ purchasedBookIds }) {
    const purchasedBooks = await this.find({ _id: { $in: purchasedBookIds } }).sort({
      createdAt: -1,
    });
    return { purchasedBooks };
  }
}

bookSchema.loadClass(BookClass);
const Book = mongoose.model('Book', bookSchema);
export default Book;

// Resources:
// https://github.com/jxson/front-matter
// https://docs.mongodb.com/manual/reference/operator/query/in/#op._S_in
// https://github.com/jxson/front-matter
