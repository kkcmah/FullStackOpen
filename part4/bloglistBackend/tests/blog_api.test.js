const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const Blog = require("../models/blog");
const helper = require("./test_helper");

beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(helper.initialBlogs);
});

describe("when there are some initial blogs saved", () => {
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
});

describe("addition of a new blog", () => {
  test("succeeds with valid data", async () => {
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

    const blogsInDb = await helper.blogsInDb();

    const updatedblogs = blogsInDb.map((r) => {
      return {
        title: r.title,
        author: r.author,
        url: r.url,
        likes: r.likes,
      };
    });

    expect(updatedblogs).toHaveLength(helper.initialBlogs.length + 1);
    expect(updatedblogs).toContainEqual({
      title: "new title",
      author: "new author",
      url: "new url",
      likes: 5,
    });
  });

  test("defaults 'likes' property to 0 if it is missing", async () => {
    const newBlog = {
      title: "new title",
      author: "new author",
      url: "new url",
    };

    await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const blogsInDb = await helper.blogsInDb();

    const updatedblogs = blogsInDb.map((r) => {
      return {
        title: r.title,
        author: r.author,
        url: r.url,
        likes: r.likes,
      };
    });

    expect(updatedblogs).toHaveLength(helper.initialBlogs.length + 1);
    expect(updatedblogs).toContainEqual({
      title: "new title",
      author: "new author",
      url: "new url",
      likes: 0,
    });
  });

  test("fails with 400 if blog is missing title and url", async () => {
    const newBlog = {
      author: "new author",
      likes: 2,
    };

    await api.post("/api/blogs").send(newBlog).expect(400);
    const blogsInDb = await helper.blogsInDb();

    expect(blogsInDb).toHaveLength(helper.initialBlogs.length);
  });
});

describe("deletion of a blog", () => {
  test("succeeds with status code 204 if id is valid", async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToDelete = blogsAtStart[0];

    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

    const blogsAtEnd = await helper.blogsInDb();

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1);

    const blogIds = blogsAtEnd.map((r) => r.id);

    expect(blogIds).not.toContain(blogToDelete.id);
  });
});

describe("updating a blog", () => {
  test("successfully updates the blog", async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToUpdate = {
      ...blogsAtStart[0], 
      title: "updated title",
      author: "updated author",
      url: "updated url",
      likes: 123
    };

    await api
    .put(`/api/blogs/${blogToUpdate.id}`)
    .send(blogToUpdate)
    .expect(200);

    const blogsAtEnd = await helper.blogsInDb();

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);

    expect(blogsAtEnd).toContainEqual(blogToUpdate);
    
  });

  test("fails with code 400 if likes is not a type of number", async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToUpdate = {
      ...blogsAtStart[0], 
      likes: "im a string"
    };

    await api
    .put(`/api/blogs/${blogToUpdate.id}`)
    .send(blogToUpdate)
    .expect(400);

    const blogsAtEnd = await helper.blogsInDb();

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);
    expect(blogsAtEnd).toContainEqual(blogsAtStart[0]);
    
  });
});

afterAll(() => {
  mongoose.connection.close();
});
