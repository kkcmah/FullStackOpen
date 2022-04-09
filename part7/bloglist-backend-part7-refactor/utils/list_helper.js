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

// returns author and blog count for author with most blogs
const mostBlogs = (blogs) => {
  if (blogs.length === 0) return {};
  let authorDict = {};
  for (const blog of blogs) {
    if (authorDict[blog.author] === undefined) {
      authorDict[blog.author] = 1;
    } else {
      authorDict[blog.author]++;
    }
  }
  let most = {
    blogs: 0,
  };
  for (const prop in authorDict) {
    if (!authorDict.hasOwnProperty(prop)) continue;
    if (authorDict[prop] > most.blogs) {
      most = {
        author: prop,
        blogs: authorDict[prop],
      };
    }
  }
  return most;
};

// returns author and like count for author with most likes
const mostLikes = (blogs) => {
  if (blogs.length === 0) return {};
  let authorDict = {};
  for (const blog of blogs) {
    if (authorDict[blog.author] === undefined) {
      authorDict[blog.author] = blog.likes;
    } else {
      authorDict[blog.author]+= blog.likes ;
    }
  }
  let most = {
    likes: 0,
  };
  for (const prop in authorDict) {
    if (!authorDict.hasOwnProperty(prop)) continue;
    if (authorDict[prop] > most.likes) {
      most = {
        author: prop,
        likes: authorDict[prop],
      };
    }
  }
  return most;
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
};
