import mongoose from 'mongoose';
import generateSlug from '../utils/slugify';
import Chapter from './Chapter';

const bookSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  createdAt: {
    type: Date,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  // ======== Github ============
  // name of repo
  githubRepo: {
    type: String,
    required: true,
  },
  // latest repo commit ID
  githubLastCommitSha: String,
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
    book.chapters = (await Chapter.find({ bookId: book._id }, 'title slug')
      .sort({ order: 1 }))
      .map(chapter => chapter.toObject());
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
    return this.updateOne({ _id: id }, { $set: modifier });
  }
}

bookSchema.loadClass(BookClass);
const Book = mongoose.model('Book', bookSchema);
export default Book;
