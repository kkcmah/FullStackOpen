import { useState, useEffect } from "react";
import Blog from "./Blog";
import blogsService from "../services/blogs";
import Notification from "./Notification";
import Togglable from "./Togglable";

const Blogs = ({ user, handleUserLogout }) => {
  const [blogs, setBlogs] = useState([]);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const [err, setErr] = useState(false);
  const [msg, setMsg] = useState("");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const getBlogs = async () => {
      const blogs = await blogsService.getAll();
      setBlogs(blogs);
    };
    getBlogs();
  }, []);

  const toggleVisibility = () => {
    setVisible(!visible);
  };

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
      setMsg(`a new blog ${title} by ${author} added`);
      setVisible(false);
    } catch (error) {
      setMsg("Failed to create blog");
      setErr(true);
    } finally {
      setTimeout(() => {
        setMsg(null);
      }, 5000);
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
      <Notification msg={msg} isErr={err}></Notification>
      <p>
        {user.name} logged in <button onClick={handleUserLogout}>Logout</button>
      </p>
      <Togglable
        toggleVisibility={toggleVisibility}
        visible={visible}
        buttonLabel="new blog"
      >
        {createBlogForm()}
      </Togglable>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default Blogs;
