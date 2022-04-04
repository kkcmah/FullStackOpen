import { useState, useEffect } from "react";
import Blog from "./Blog";
import blogsService from "../services/blogs";
import Notification from "./Notification";
import Togglable from "./Togglable";
import BlogForm from "./BlogForm";

const Blogs = ({ user, handleUserLogout }) => {
  const [blogs, setBlogs] = useState([]);

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

  const handleCreateBlog = async (blogToCreate) => {
    try {
      await blogsService.createBlog(blogToCreate);

      const blogs = await blogsService.getAll();
      setBlogs(blogs);
      setMsg(
        `a new blog ${blogToCreate.title} by ${blogToCreate.author} added`
      );
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

  const handleLikeBlog = async (blogToLike) => {
    try {
      await blogsService.likeBlog(blogToLike);
      const blogs = await blogsService.getAll();
      setBlogs(blogs);
    } catch (error) {
      setMsg("Failed to like blog");
      setErr(true);
      setTimeout(() => {
        setMsg(null);
      }, 5000);
    }
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
        <BlogForm handleCreateBlog={handleCreateBlog}></BlogForm>
      </Togglable>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} handleLikeBlog={handleLikeBlog} />
      ))}
    </div>
  );
};

export default Blogs;
