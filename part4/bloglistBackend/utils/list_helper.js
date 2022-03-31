const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  if (blogs.length === 0) return 0;
  return blogs.reduce((prev, cur) => prev + cur.likes, 0);
};

// returns blog with most likes
const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return {};
  return blogs.reduce((prev, cur) => (prev.likes > cur.likes ? prev : cur));
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
};
