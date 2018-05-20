import express from 'express';

const port = process.env.PORT || 8000;
const ROOT_URL = process.env.ROOT_URL || `http://localhost:${port}`;

const server = express();

server.get('/', (req, res) => {
  res.send('Express page');
});

server.listen(port, () => {
  console.log(`>>>> Ready on port ${ROOT_URL}`); // eslint-disable-line no-console
});
