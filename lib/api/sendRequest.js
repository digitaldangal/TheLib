// import fetch for older browsers that don't support it yet.
import 'isomorphic-fetch';

const port = process.env.PORT || 8000;
const ROOT_URL = process.env.ROOT_URL || `http://localhost:${port}`;

export default async function sendRequest(path, options = {}) {
  // create a new header obj out of 3 smaller ones: {}, opts.header or {},{content-type:...}
  const headers = Object.assign({}, options.headers || {}, {
    'Content-type': 'application/json; charset=UTF-8',
  });

  // fetch(path,options) - global JS method that takes a rt and the params
  // of a req, then returns a res w/ data available from the API endpoint
  const response = await fetch( // call and wait for fetch()
    `${ROOT_URL}${path}`,
    Object.assign({ method: 'POST', credentials: 'include' }, options, { headers }),
  );

  const data = await response.json(); // return the data in JSON format

  if (data.error) {
    throw new Error(data.error);
  }

  return data; // return the data
}


// https://github.github.io/fetch/
// https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Client-side_web_APIs/Fetching_data
