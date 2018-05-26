import generateSlug from '../../../server/utils/slugify';

const MockUser = {
  // Think of this array as a seed, or imitation of my DB
  slugs: ['ric-flair-jr', 'ric-flair-jr-1', 'ric'],
  findOne({ slug }) {
    if (this.slugs.includes(slug)) {
      return Promise.resolve({ id: 'id' });
    }

    return Promise.resolve(null);
  },
};

describe('slugify', () => {
  test('no duplication', () => {
    expect.assertions(1);
    /*
    * generate the slug ric-flair as my MockUser
    * since `ric-flair` doesn't match anyone inside my slugs array
    * return `Promise.resolve(null)`. Thus, the generateSlug() from
    * slugify.js invokes this => if (!user) { return origSlug; }
    */

    return generateSlug(MockUser, 'Ric Flair.').then((slug) => {
      expect(slug).toBe('ric-flair');
    });
  }); // No duplication

  test('one duplication', () => {
    expect.assertions(1);

    return generateSlug(MockUser, 'Ric.').then((slug) => {
      expect(slug).toBe('ric-1');
    });
  }); // One duplication

  test('multiple duplications', () => {
    expect.assertions(1);

    return generateSlug(MockUser, 'Ric Flair Jr.').then((slug) => {
      expect(slug).toBe('ric-flair-jr-2');
    });
  }); // Multiple duplications
}); // End suite
