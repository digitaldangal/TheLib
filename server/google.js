/* eslint-disable */
import passport from 'passport';
import { OAuth2Strategy as Strategy } from 'passport-google-oauth';

import User from './models/User';

export default function auth({ ROOT_URL, server }) {
  // Wait for signInOrSignUp() to return a user
  const verify = async (accessToken, refreshToken, profile, verified) => {
    let email;
    let avatarUrl;

    if (profile.emails) {
      email = profile.emails[0].value; // Grab 1st email from emails array
    }

    if (profile.photos && profile.photos.length > 0) {
      // replace profile img sz 50 for 128
      avatarUrl = profile.photos[0].value.replace('sz=50', 'sz=128');
    }

    try {
      // Waiting for signInOrSignUp() to complete before invoking
      const user = await User.signInOrSignUp({
        // Passing all data received from Google to User.signInOrSignUp()
        googleId: profile.id,
        email,
        googleToken: { accessToken, refreshToken },
        displayName: profile.displayName,
        avatarUrl,
      });
      // in case of success, return null for err and user
      verified(null, user);
    } catch (err) {
      // in case of err, return null for user and err
      verified(err);
			console.log(err); // eslint-disable-line
    }
  };
  passport.use(new Strategy(
    {
      clientID: process.env.Google_clientID,
      clientSecret: process.env.Google_clientSecret,
      callbackURL: `${ROOT_URL}/oauth2callback`,
    },
    verify,
  ));

  passport.serializeUser((user, done) => {
    // (null val for an err arg, like the verified() callback above,
    //  passport associates a users session by saving user.id to my session, thus
    // saving the user id to session document at session.passport.user.id)
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    // If the cookie matches w/ the session, and the session has a user id,
    // then take that id and find my user in my collection(DB) with User.findById().
    // User.publicFields() allows us to send public params to the client
    // deserializeUser() passes the user object to `req.user`
    // but only after the a user has been located by id
    User.findById(id, User.publicFields(), (err, user) => {
      done(err, user);
    });
  });
  // Mounts passport middleware in my express server
  server.use(passport.initialize());
  // Created persistent login sessions
  server.use(passport.session());

  // Express routes
  // Redirects user after Google login
  server.get('/auth/google', (req, res, redirectUrl) => {
    // Save `redirectUrl` to `req.session` obj before calling passport.
    // This is to make sure that req.query adn req.query.redirectUrl that the latter starts with `/`
    if (req.query && req.query.redirectUrl && req.query.redirectUrl.startsWith('/')) {
      // if all 3 conditions are true, save redirectUrl to the session as req.session.finalUrl
      req.session.finalUrl = req.query.redirectUrl;
    } else {
      req.session.finalUrl = null;
    }

    passport.authenticate('google', {
      scope: ['profile', 'email'],
      prompt: 'select_account',
    })(req, res, redirectUrl);
  });

  server.get(
    '/oauth2callback',
    passport.authenticate('google', {
      failureRedirect: '/login',
    }),
    (req, res) => {
      if (req.user && req.user.isAdmin) {
        res.redirect('/admin');
      } else if (req.session.finalUrl) {
        res.redirect(req.session.finalUrl);
      } else {
        res.redirect('/my-books');
      }
    },
  );

  server.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/login');
  });
} // auth closing brace


// Resources:
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/startsWith
