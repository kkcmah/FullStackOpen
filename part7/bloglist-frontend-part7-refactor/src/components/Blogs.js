import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import Blog from "./Blog";
import blogsService from "../services/blogs";
import Notification from "./Notification";
import Togglable from "./Togglable";
import BlogForm from "./BlogForm";
import { setNotification } from "../reducers/notificationReducer";

const Blogs = ({ user, handleUserLogout }) => {
  const [blogs, setBlogs] = useState([]);

  const [visible, setVisible] = useState(false);

  const dispatch = useDispatch();

  const getSortedBlogs = async () => {
    let blogs = await blogsService.getAll();
    blogs.sort((a, b) => b.likes - a.likes);
    setBlogs(blogs);
  };

  useEffect(() => {
    getSortedBlogs();
  }, []);

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const handleCreateBlog = async (blogToCreate) => {
    try {
      await blogsService.createBlog(blogToCreate);

      getSortedBlogs();
      dispatch(
        setNotification(
          `a new blog ${blogToCreate.title} by ${blogToCreate.author} added`,
          false,
          5
        )
      );
      setVisible(false);
    } catch (error) {
      dispatch(setNotification("Failed to create blog", true, 5));
    }
  };

  const handleLikeBlog = async (blogToLike) => {
    try {
      await blogsService.likeBlog(blogToLike);
      getSortedBlogs();
    } catch (error) {
      dispatch(setNotification("Failed to like blog", true, 5));
    }
  };

  const handleDeleteBlog = async (blogToDelete) => {
    try {
      console.log(blogToDelete);
      await blogsService.deleteBlog(blogToDelete);
      getSortedBlogs();
    } catch (error) {
      dispatch(setNotification("Failed to delete blog", true, 5));
    }
  };

  return (
    <div>
      <h2>blogs</h2>
      <Notification></Notification>
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
        <Blog
          key={blog.id}
          blog={blog}
          user={user}
          handleLikeBlog={handleLikeBlog}
          handleDeleteBlog={handleDeleteBlog}
        />
      ))}
    </div>
  );
};

export default Blogs;
