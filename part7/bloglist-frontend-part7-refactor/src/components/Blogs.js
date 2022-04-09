import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Blog from "./Blog";
import Notification from "./Notification";
import Togglable from "./Togglable";
import BlogForm from "./BlogForm";
import { setNotification } from "../reducers/notificationReducer";
import { createBlog, likeBlog, deleteBlog } from "../reducers/blogReducer";
import { logoutUser } from "../reducers/userReducer";

const Blogs = () => {
  const [visible, setVisible] = useState(false);
  const user = useSelector((state) => state.user);
  const blogs = useSelector((state) => state.blogs);
  const dispatch = useDispatch();

  const sortedBlogs = blogs.slice().sort((a, b) => b.likes - a.likes);

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const handleCreateBlog = async (blogToCreate) => {
    dispatch(createBlog(blogToCreate, user));
    dispatch(
      setNotification(
        `a new blog ${blogToCreate.title} by ${blogToCreate.author} added`,
        false,
        5
      )
    );
    setVisible(false);
  };

  const handleLikeBlog = async (blogToLike) => {
    dispatch(likeBlog(blogToLike));
  };

  const handleDeleteBlog = async (blogToDelete) => {
    dispatch(deleteBlog(blogToDelete));
  };

  const handleUserLogout = () => {
    dispatch(logoutUser());
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
      {sortedBlogs.map((blog) => (
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
