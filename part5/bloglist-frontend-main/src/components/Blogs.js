import { useState, useEffect } from "react";
import Blog from "./Blog";
import blogsService from "../services/blogs";

const Blogs = ({ user, handleUserLogout }) => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    blogsService.getAll().then((blogs) => setBlogs(blogs));
  }, []);
  return (
    <div>
      <h2>blogs</h2>
      <p>
        {user.name} logged in <button onClick={handleUserLogout}>Logout</button>
      </p>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default Blogs;
