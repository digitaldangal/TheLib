/* eslint no-console: 0 */
import express from 'express';
// Creates session and save a cookie to the browser
import session from 'express-session';
import compression from 'compression';
// Connects to my DB an saves the session
import mongoSessionStore from 'connect-mongo';
import next from 'next';
import mongoose from 'mongoose';
import helmet from 'helmet';
import getRootUrl from '../lib/api/getRootUrl';
import sitemapAndRobots from './sitemapAndRobots';

import auth from './google';
import { setupGithub as github } from './github';

import api from './api';

import logger from './logs';
import routesWithSlug from './routesWithSlug';

// Configure .env
require('dotenv').config();

// Passing NODE_ENV to Next.js server. True when the env is not prod, false when env is in prod
const dev = process.env.NODE_ENV !== 'production';
// Mongo connection
const MONGO_URL = process.env.MONGO_URL_TEST;
// DB
mongoose.connect(MONGO_URL);


// Port
const port = process.env.PORT || 8000;

// Prod
const ROOT_URL = getRootUrl();

const URL_MAP = {
  '/login': '/public/login',
  '/my-books': '/customer/my-books',
};

const app = next({ dev });
// Handler function
const handle = app.getRequestHandler();

// NextJS GET to prep server
app.prepare().then(() => {
  const server = express();
  server.use(helmet());
  server.use(compression());
  server.use(express.json());

  // MongoDB session store config
  const MongoStore = mongoSessionStore(session);
  const sess = {
    // cookie name
    name: 'thelib.sid',
    /**
      key used to encode/decode the sessions cookie, could be anything.
      a cookie does not contain session data but only the session ID (encoded with secret),
      the server stores session data in memory.
     */
    secret: 'HD2w.)q*VqRT4/#NK2M/,E^B)}FED5fWU!dKe[wk',
    store: new MongoStore({
      mongooseConnection: mongoose.connection,
      ttl: 14 * 24 * 60 * 60, // save session for 14 days, just like the cookie
    }),
    // forces the session to be saved to "store", even if the session was not modified.
    resave: false,
    // saves any new unmodified "uninitialized" session to "store".
    saveUninitialized: false,
    // The sessions cookie, set to httpOnly for local development.
    cookie: {
      /**
        The cookie is only available to the
        server via HTTP and not accessible via client-side JS. This is a security measure.
       */
      httpOnly: true,
      // The browser will remove the cookie after maxAge ms.
      maxAge: 14 * 24 * 60 * 60 * 1000, // maxAge = 14 days.
    },
  };
  if (!dev) {
    server.set('trust proxy', 1); // sets req.hostname, req.ip
    sess.cookie.secure = true; // sets cookie over HTTPS only
  }

  server.use(session(sess));
  // must always be below my passport middleware to work properly
  // http://www.passportjs.org/docs/configure/
  auth({ server, ROOT_URL });
  github({ server });
  api(server);
  routesWithSlug({ server, app });
  sitemapAndRobots({ server });

  server.get('*', (req, res) => {
    const url = URL_MAP[req.path];
    if (url) {
      app.render(req, res, url);
    } else {
      handle(req, res);
    }
  });

  server.listen(port, (err) => {
    if (err) throw err;
    logger.info(`> Ready on ${ROOT_URL}`);
  });
});


// Resources
// https://github.com/expressjs/session#cookiesecure
// https://en.wikipedia.org/wiki/Proxy_server#Web_proxy_servers
// https://helmetjs.github.io/docs/hide-powered-by/
// https://expressjs.com/en/advanced/best-practice-security.html
