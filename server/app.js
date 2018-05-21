import express from 'express';
import next from 'next';
import mongoose from 'mongoose';

// Passing NODE_ENV to next server. True when the env is not prod, false when env is in prod
const dev = process.env.NODE_ENV !== 'production';
// Mongo connection
const MONGO_URL = process.env.MONGO_URL_TEST;
mongoose.connect(MONGO_URL);

// Port
const port = process.env.PORT || 8000;
const ROOT_URL = process.env.ROOT_URL || `http://localhost:${port}`;

const app = next({ dev });
// Handler function
const handle = app.getRequestHandler();

// GET Request function - next docs
app.prepare().then(() => {
  const server = express();

  server.get('/', (req, res) => {
    const user = { email: 'varcodes1@gmail.com' };
    app.render(req, res, '/', { user });
  });

  server.get('*', (req, res) => handle(req, res));

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on ${ROOT_URL}`); // eslint-disable-line no-console
  });
});
