const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const Blog = require("../models/blog");
const helper = require("./test_helper");

beforeEach(async () => {
  await Blog.deleteMany({});
  for (let blog of helper.initialBlogs) {
    let blogObject = new Blog(blog);
    await blogObject.save();
  }
});

test("blogs are returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test(`there are ${helper.initialBlogs.length} blogs`, async () => {
  const response = await api.get("/api/blogs");

  expect(response.body).toHaveLength(helper.initialBlogs.length);
});

test("unique identifier property of the blog posts is named id", async () => {
  const response = await api.get("/api/blogs");
  expect(response.body[0].id).toBeDefined();
});

test("a valid blog can be added", async () => {
  const newBlog = {
    title: "new title",
    author: "new author",
    url: "new url",
    likes: 5,
  };

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const response = await api.get("/api/blogs");

  const updatedblogs = response.body.map((r) => {
    return {
      title: r.title,
      author: r.author,
      url: r.url,
      likes: r.likes,
    };
  });

  expect(response.body).toHaveLength(helper.initialBlogs.length + 1);
  expect(updatedblogs).toContainEqual({
    title: "new title",
    author: "new author",
    url: "new url",
    likes: 5,
  });
});

afterAll(() => {
  mongoose.connection.close();
});
