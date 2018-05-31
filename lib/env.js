/* eslint-disable */
// This file will export window.__ENV__`"StripePublishableKey": "12343434fff12etc"` If a window obj exist`window !== 'undefined`
// else, if window obj does NOT exist(server env), export the server environment `process.env`
export default (typeof window !== 'undefined' ? window.__ENV__ : process.env);

// In Next.js, initial load is server side rendered, the rest are client side. This conditional code accounts for that 
// conditional behavior

// Resources
// https://stackoverflow.com/questions/6547293/why-some-attribute-names-start-with-double-underscore-in-javascript
