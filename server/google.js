import passport from 'passport';
import { OAuth2Strategy as Strategy } from 'passport-google-oauth';

import User from './models/User';

function auth({ ROOT_URL, server }) {
  // Wait for signInOrSignUp() to return a user
  const verify = async (accessToken, refreshToken, profile, verified) => {
    let email;
    let avatarUrl;

    if (profile.emails) {
      email = profile.emails[0].value; // Grab 1st email from emails array
    }

    if (profile.image && profile.image.url) {
      avatarUrl = profile.image.url.replace('sz=50', 'sz=128'); // replace profile img sz 50 for 128
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
  server.get(
    'auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email'],
      prompt: 'select_account',
    }),
  );

  server.get(
    '/oauth2callback',
    passport.authenticate('google', {
      failureRedirect: '/login',
    }),
    (req, res) => {
      res.redirect('/');
    },
  );

  server.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/login');
  });
} // closing auth()

export default auth;
