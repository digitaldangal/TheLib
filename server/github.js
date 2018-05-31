import qs from 'qs';
import request from 'request';
import GithubAPI from '@octokit/rest';

import User from './models/User';

const AUTHORIZE_URI = 'https://github.com/login/oauth/authorize';
const TOKEN_URI = 'https://github.com/login/oauth/access_token';

export function setupGithub({ server }) {
  const dev = process.env.NODE_ENV !== 'production';

  const CLIENT_ID = dev ? process.env.Github_Test_ClientID : process.env.Github_Live_ClientID;
  const API_KEY = dev ? process.env.Github_Test_SecretKey : process.env.Github_Live_SecretKey;

  server.get('/auth/github', (req, res) => {
    // check if user exists and user is Admin
    if (!req.user || !req.user.isAdmin) {
      // If not, redirect to Login page and return undefined
      res.redirect('/login');
      return;
    }
    // Redirect to GH OAuth endpoint (we will qs.stringify() here)
    res.redirect(`${AUTHORIZE_URI}?${qs.stringify({
      // qs.stringify() will create a full url
      scope: 'repo',
      client_id: CLIENT_ID,
    })}`);
  });

  server.get('/auth/github/callback', (req, res) => {
    // check if user exists and user is Admin
    if (!req.user || !req.user.isAdmin) {
      res.redirect('/login');
      return;
    }
    // If not, redirect to Login page, return undefined.
    // (same as above.)

    // If GH's server has an error(req.query), redirect and return undefined
    if (req.query.error) {
      res.redirect(`/admin?error=${req.query.error_description}`);
      return;
    }

    const { code } = req.query;

    // else, send a post request to `TOKEN_URI` w/ 3 params
    // client_id, auth code(taken from GH's initial res), and client_secret
    request.post(
      //  send request from our server to GH's server
      {
        url: TOKEN_URI,
        // tell GH server to expect JSON data
        headers: { Accept: 'application/json' },
        form: {
          client_id: CLIENT_ID,
          code,
          client_secret: API_KEY,
        },
      },
      async (err, response, body) => {
        // return undefined if result has an error
        if (err) {
          res.redirect(`/admin?error=${err.message || err.toString()}`);
          return;
        }

        const result = JSON.parse(body);

        if (result.error) {
          res.redirect(`/admin?error=${result.error_description}`);
          return;
        }

        try {
          // Update User doc in the DB
          await User.updateOne(
            { _id: req.user.id },
            { $set: { isGithubConnected: true, githubAccessToken: result.access_token } },
          );
          res.redirect('/admin');
        } catch (err2) {
          res.redirect(`/admin?error=${err2.message || err2.toString()}`);
        }
      },
    );
  });
}

function getAPI({ accessToken }) {
  //  set parameters for new GithubAPI()
  const github = new GithubAPI({
    timeout: 5000,
    baseUrl: 'https://api.github.com', // should be api.github.com for GitHub
    headers: {
      accept: 'application/json',
    },
    requestMedia: 'application/json',
  });

  //  authenticate user
  github.authenticate({
    type: 'oauth',
    token: accessToken,
  });
  return github;
}

export function getRepos({ accessToken }) {
  // function that grabs list of repos for user
  const github = getAPI({ accessToken });
  return github.repos.getAll({ per_page: 100 });
}

export function getContent({ accessToken, repoName, path }) {
  // function that gets repo's content
  const github = getAPI({ accessToken });
  const [owner, repo] = repoName.split('/');
  return github.repos.getContent({ owner, repo, path });
}

export function getCommits({ accessToken, repoName, limit }) {
  // 12. function that gets list of repo's commits
  const github = getAPI({ accessToken });
  const [owner, repo] = repoName.split('/');
  return github.repos.getCommits({ owner, repo, per_page: limit });
}

// Resources:
// https://developer.github.com/v3/guides/basics-of-authentication/#accepting-user-authorization
// https://github.com/octokit/rest.js#options
// https://github.com/octokit/rest.js/blob/master/examples/getRepos.js
// https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Authorization
