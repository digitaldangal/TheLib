import sm from 'sitemap';
import path from 'path';

import Chapter from './models/Chapter';

const sitemap = sm.createSitemap({
  hostname: 'https://thelib.tech',
  cacheTime: 600000, // 600 sec - cache purge period
});

export default function setup({ server }) {
  Chapter.find({}, 'slug').then((chapters) => {
    chapters.forEach((chapter) => {
      sitemap.add({
        url: `/books/the-lib/${chapter.slug}`,
        changefreq: 'daily',
        priority: 1,
      });
    });
  });

  server.get('/sitemap.xml', (req, res) => {
    sitemap.toXML((err, xml) => {
      if (err) {
        res.status(500).end();
        return;
      }

      res.header('Content-Type', 'application/xml');
      res.send(xml);
    });
  });

  server.get('/robots.txt', (req, res) => {
    res.sendFile(path.join(__dirname, '../static', 'robots.txt'));
  });
}

// Resources
// https://www.google.com/webmasters/tools/home?hl=en&pli=1
// https://github.com/ekalinin/sitemap.js#example-of-using-sitemapjs-with-express
// https://github.com/ekalinin/sitemap.js
