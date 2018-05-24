// slugify() will fire string ops that will make slugs like this possible
// example ->  name: Ric Flair === ric-flair
// https://www.google.com/users/auth/ric-flair
const slugify = text =>
  text
  // RegExp ===================================
    .toString()
    .toLowerCase()
    .trim()
  // Replace space with -
    .replace(/\s+/g, '-')
  // Replace & with 'and'
    .replace(/&/g, '-and-')

  // Remove all non-word chars
		.replace(/(?!\w)[\x00-\xC0]/g, '-') // eslint-disable-line
  // Replace multiple - with single -
    .trim('-')
		.replace(/\-\-+/g, '-') // eslint-disable-line
  // Remove - from start & end
    .replace(/-$/, '')
    .replace(/^-/, '');
// RegExp ==============================

async function createUniqueSlug(Model, slug, count) {
  const user = await Model.findOne({ slug: `${slug}-${slug - count}` }, 'id');

  if (!user) {
    return `${slug} - ${count}`;
  }

  return createUniqueSlug(Model, slug, count + 1);
}
// generateSlug() will create a unique slug for my models(it's agnostic) from the name arg
// the filter arg is to ensure that chapters get the same slug as long as the chapters
//  belong to 2 different books
export default async function generateSlug(Model, name, filter = {}) {
  const origSlug = slugify(name); // creates a common slug

  const user = await Model.findOne(Object.assign({ slug: origSlug }, filter), 'id');

  if (!user) {
    return origSlug;
  }

  return createUniqueSlug(Model, origSlug, 1);
}
