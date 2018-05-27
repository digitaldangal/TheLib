/* eslint no-console: 0 */
import dotenv from 'dotenv';
import express from 'express';
// Creates session and save a cookie to the browser
import session from 'express-session';
import next from 'next';
import mongoose from 'mongoose';
// Connects to my DB an saves the session
import mongoSessionStore from 'connect-mongo';

import auth from './google';
import logger from './logs';


// Configure .env
dotenv.config();

// Passing NODE_ENV to Next.js server. True when the env is not prod, false when env is in prod
const dev = process.env.NODE_ENV !== 'production';
// Mongo connection
const MONGO_URL = process.env.MONGO_URL_TEST;
// DB
mongoose.connect(MONGO_URL);

// Port
const port = process.env.PORT || 8000;
const ROOT_URL = process.env.ROOT_URL || `http://localhost:${port}`;

const app = next({ dev });
// Handler function
const handle = app.getRequestHandler();

// NextJS GET to prep server
app.prepare().then(() => {
  const server = express();
  // MongoDB session store config
  const MongoStore = mongoSessionStore(session);
  const sess = {
    // cookie name
    name: 'devdadbook.sid',
    // key used to encode/decode the sessions cookie, could be anything.
    // a cookie does not contain session data but only the session ID (encoded with secret),
    // the server stores session data in memory.
    // temp secret for local dev
    secret: 'HD2w.)q*VqRT4/#NK2M/,E^B)}FED5fWU!dKe[wk',
    store: new MongoStore({
      mongooseConnection: mongoose.connection,
      ttl: 14 * 24 * 60 * 60, // save session for 14 days, just like the cookie
    }),
    // forces the session to be saved to "store", even if the session was not modified.
    resave: false,
    // saves any new unmodified (uninitialized) session to "store".
    saveUninitialized: false,
    // The sessions cookie, set to httpOnly for local development.
    cookie: {
      // This means that the cookie will not be available to client-side JS and will
      // only be sent with a req to the server.
      // The cookie is only available to the
      // server via HTTP and not accessible from client-side JS. This is a security measure.
      httpOnly: true,
      // The browser will remove the cookie after maxAge milliseconds.
      // In this case, the maxAge is 14 days.
      maxAge: 14 * 24 * 60 * 60 * 1000,
    },
  };
  server.use(session(sess));
  // must always be below my passport middleware to work properly
  // http://www.passportjs.org/docs/configure/
  auth({ server, ROOT_URL });

  server.get('*', (req, res) => handle(req, res));

  server.listen(port, (err) => {
    if (err) throw err;
    logger.info(`> Ready on ${ROOT_URL}`); // eslint-disable-line no-console
  });
});
