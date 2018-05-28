import mongoose from 'mongoose';

import Book from './Book';

const { Schema } = mongoose;

const chapterSchema = new Schema({
  bookId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  isFree: {
    type: Boolean,
    required: true,
    default: false,
  },
  title: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    default: '',
    required: true,
  },
  excerpt: {
    type: String,
    default: '',
  },
  htmlExcerpt: {
    type: String,
    default: '',
  },
  createdAt: {
    type: Date,
    required: true,
  },
  githubFilePath: {
    type: String,
    unique: true,
  },
  order: {
    type: Number,
    required: true,
  },
  seoTitle: String,
  seoDescription: String,
});

class ChapterClass {
  static async getBySlug({ bookSlug, chapterSlug, user }) {
    // find book by slug
    const book = await Book.getBySlug({ slug: bookSlug, user });
    // if not successful, throw err
    if (!book) {
      throw new Error('Not found');
    }
    // if successful, find a chapter by the slug found.
    // findOne() is the best method to find 1 unique document in Mongo.
    // bookId and slug MUST be unique
    const chapter = await this.findOne({ bookId: book._id, slug: chapterSlug });

    if (!chapter) {
      throw new Error('Not found');
    }
    // then convert the MongoDB docs into plain JS objects
    const chapterObj = chapter.toObject();
    chapterObj.book = book;

    return chapterObj;
  }
}

// index is a Data Structure that will store the value of 1 or more params.
// this is different than the default Mongo index `_id` param.
chapterSchema.index({ bookId: 1, slug: 1 }, { unique: true });
// unique compound index for bookId and githubFilePath pairs
chapterSchema.index({ bookId: 1, githubFilePath: 1 }, { unique: true });

chapterSchema.loadClass(ChapterClass);

const Chapter = mongoose.model('Chapter', chapterSchema);

export default Chapter;

// Resources
// https://docs.mongodb.com/manual/core/index-unique/#unique-compound-index
// https://docs.mongodb.com/manual/indexes/#index-types
