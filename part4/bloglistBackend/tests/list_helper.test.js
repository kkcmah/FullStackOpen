const listHelper = require("../utils/list_helper");
const helper = require("./test_helper");

const blogs = helper.initialBlogs;

const listWithOneBlog = [
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0,
  },
];

test("dummy returns one", () => {
  const blogs = [];

  const result = listHelper.dummy(blogs);
  expect(result).toBe(1);
});

describe("total likes", () => {
  test("when list has only one blog, equals the likes of that", () => {
    const result = listHelper.totalLikes(listWithOneBlog);
    expect(result).toBe(5);
  });

  test("when list has no blogs likes equals 0", () => {
    const result = listHelper.totalLikes([]);
    expect(result).toBe(0);
  });

  test("when list has many blogs likes equals sum of likes", () => {
    const result = listHelper.totalLikes(blogs);
    expect(result).toBe(36);
  });
});

describe("favorite blog", () => {
  test("when list has only one blog, favorite blog is the one blog", () => {
    const result = listHelper.favoriteBlog(listWithOneBlog);
    expect(result).toEqual({
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
      __v: 0,
    });
  });

  test("when list has no blogs favorite blog is empty", () => {
    const result = listHelper.favoriteBlog([]);
    expect(result).toEqual({});
  });

  test("when list has many blogs favorite blog is one with most likes", () => {
    const result = listHelper.favoriteBlog(blogs);
    expect(result).toEqual({
      _id: "5a422b3a1b54a676234d17f9",
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 12,
      __v: 0,
    });
  });
});

describe("most blogs", () => {
  test("when list has only one blog, most blogs is author name and 1", () => {
    const result = listHelper.mostBlogs(listWithOneBlog);
    expect(result).toEqual({
      author: "Edsger W. Dijkstra",
      blogs: 1,
    });
  });

  test("when list has no blogs most blog is empty", () => {
    const result = listHelper.mostBlogs([]);
    expect(result).toEqual({});
  });

  test("when list has many blogs most blog is author with most blogs", () => {
    const result = listHelper.mostBlogs(blogs);
    expect(result).toEqual({
      author: "Robert C. Martin",
      blogs: 3,
    });
  });
});

describe("most likes", () => {
  test("when list has only one blog, most likes is author name and likes is blog likes", () => {
    const result = listHelper.mostLikes(listWithOneBlog);
    expect(result).toEqual({
      author: "Edsger W. Dijkstra",
      likes: 5,
    });
  });

  test("when list has no blogs most likes is empty", () => {
    const result = listHelper.mostLikes([]);
    expect(result).toEqual({});
  });

  test("when list has many blogs most likes is author with most likes", () => {
    const result = listHelper.mostLikes(blogs);
    expect(result).toEqual({
      author: "Edsger W. Dijkstra",
      likes: 17,
    });
  });
});
