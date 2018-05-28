// API endpoints for Admin user
import express from 'express';


import Book from '../models/Book';
import logger from '../logs';

const router = express.Router();

// permission gateway
router.use((req, res, next) => {
  // if user exist and the user is an admin, fire up next()
  if (!req.user || !req.user.isAdmin) {
    // if not, attach an err to the status.
    res.status(401).json({ error: 'Unauthorized!' });
    // return undefined
    return;
  }

  next(); // next() ends the req/res cycle
});

// GET - a list of books from Book model
router.get('/books', async (req, res) => {
  try {
    const books = await Book.list();
    res.json(books);
  } catch (err) {
    res.json({ error: err.message || err.toString() });
  }
});


router.post('/books/add', async (req, res) => {
  try {
    const book = await Book.add(Object.assign({ userId: req.user.id }, req.body));
    res.json(book);
  } catch (err) {
    logger.error(err);
    res.json({ error: err.message || err.toString() });
  }
});

router.post('/books/edit', async (req, res) => {
  try {
    await Book.edit(req.body);
    res.json({ done: 1 });
  } catch (err) {
    res.json({ error: err.message || err.toString() });
  }
});

router.get('/books/detail/:slug', async (req, res) => {
  try {
    const book = await Book.getBySlug({ slug: req.params.slug });
    res.json(book);
  } catch (err) {
    res.json({ error: err.message || err.toString() });
  }
});

export default router;

// Resources
// https://expressjs.com/en/guide/using-middleware.html
// https://expressjs.com/en/api.html#res.status
