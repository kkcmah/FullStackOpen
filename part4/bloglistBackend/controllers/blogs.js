const blogRouter = require("express").Router();
const Blog = require("../models/blog");

blogRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs);
});

blogRouter.post("/", async (request, response) => {
  const blog = new Blog(request.body);
  if (blog.likes === undefined) {
    blog.likes = 0;
  }

  if (!blog.title && !blog.url) {
    return response.status(400).end();
  }

  const result = await blog.save();
  response.status(201).json(result);
});

blogRouter.delete("/:id", async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id)
  // try catch handled by express-async-errors library
  response.status(204).end();
})

module.exports = blogRouter;
