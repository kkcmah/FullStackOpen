import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Togglable from "./Togglable";
import BlogForm from "./BlogForm";
import { setNotification } from "../reducers/notificationReducer";
import { createBlog } from "../reducers/blogReducer";
import { Link } from "react-router-dom";

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

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
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
        <div style={blogStyle} className="blog" key={blog.id}>
          <Link to={`/blogs/${blog.id}`}>
            {blog.title} by {blog.author}
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Blogs;
