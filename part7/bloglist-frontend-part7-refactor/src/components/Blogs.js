import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Blog from "./Blog";
import Togglable from "./Togglable";
import BlogForm from "./BlogForm";
import { setNotification } from "../reducers/notificationReducer";
import { createBlog } from "../reducers/blogReducer";

const Blogs = () => {
  const [visible, setVisible] = useState(false);
  const blogs = useSelector((state) => state.blogs);
  const dispatch = useDispatch();

  const sortedBlogs = blogs.slice().sort((a, b) => b.likes - a.likes);

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const handleCreateBlog = async (blogToCreate) => {
    dispatch(createBlog(blogToCreate));
    dispatch(
      setNotification(
        `a new blog ${blogToCreate.title} by ${blogToCreate.author} added`,
        false,
        5
      )
    );
    setVisible(false);
  };

  return (
    <div>
      <Togglable
        toggleVisibility={toggleVisibility}
        visible={visible}
        buttonLabel="new blog"
      >
        <BlogForm handleCreateBlog={handleCreateBlog}></BlogForm>
      </Togglable>
      {sortedBlogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default Blogs;
