import { useState, useEffect } from "react";
import Blog from "./Blog";
import blogsService from "../services/blogs";

const Blogs = ({ user, handleUserLogout }) => {
  const [blogs, setBlogs] = useState([]);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  useEffect(() => {
    const getBlogs = async () => {
      const blogs = await blogsService.getAll();
      setBlogs(blogs);
    };
    getBlogs();
  }, []);

  const handleCreateBlog = async (event) => {
    event.preventDefault();
    const blogToCreate = { title, author, url };

    try {
      await blogsService.createBlog(blogToCreate);
      setTitle("");
      setAuthor("");
      setUrl("");
      const blogs = await blogsService.getAll();
      setBlogs(blogs);
    } catch (error) {
      console.log(error);
    }
  };

  const createBlogForm = () => {
    return (
      <>
        <h2>create new</h2>
        <form onSubmit={handleCreateBlog}>
          <div>
            title:
            <input
              type="text"
              value={title}
              onChange={({ target }) => {
                setTitle(target.value);
              }}
            ></input>
          </div>
          <div>
            author:
            <input
              type="text"
              value={author}
              onChange={({ target }) => {
                setAuthor(target.value);
              }}
            ></input>
          </div>
          <div>
            url:
            <input
              type="text"
              value={url}
              onChange={({ target }) => {
                setUrl(target.value);
              }}
            ></input>
          </div>

          <button type="submit">create</button>
        </form>
      </>
    );
  };
  return (
    <div>
      <h2>blogs</h2>
      <p>
        {user.name} logged in <button onClick={handleUserLogout}>Logout</button>
      </p>
      {createBlogForm()}
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default Blogs;
