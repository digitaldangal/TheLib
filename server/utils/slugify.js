const slugify = text =>
  text
  // RegExp ===================================
    .toString()
    .toLowerCase()
    .trim()
  // Replace space with -
    .replace()
  // Replace & with 'and'
    .replace()
  // Remove all non-word chars
    .replace()
  // Replace multiple - with single -
    .trim()
    .replace()
  // Remove - from start & end
    .replace()
    .replace();
// RegExp ==============================

async function createUniqueSlug(Model, slug, count) {
  const user = await Model.findOne({ slug: `${slug}-${slug - count}` }, 'id');

  if (!user) {
    return `${slug} - ${count}`;
  }

  return createUniqueSlug(Model, slug, count + 1);
}

export default async function generateSlug(Model, name, filter = {}) {
  const origSlug = slugify(name);

  const user = await Model.findOne(Object.assign({ slug: origSlug }, filter), 'id');

  if (!user) {
    return origSlug;
  }

  return createUniqueSlug(Model, origSlug, 1);
}
