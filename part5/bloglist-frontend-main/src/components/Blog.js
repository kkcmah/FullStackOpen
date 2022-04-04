import { useState } from "react";

const Blog = ({ blog, handleLikeBlog }) => {
  const [show, setShow] = useState(false);
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const likeBlog = () => {
    handleLikeBlog(blog);
  };

  return (
    <div style={blogStyle}>
      {blog.title}
      <button onClick={() => setShow(!show)}>{show ? "hide" : "view"}</button>
      {show && (
        <>
          <div>{blog.url}</div>
          <div>
            {blog.likes} <button onClick={likeBlog}>like</button>
          </div>
          <div>{blog.author}</div>
        </>
      )}
    </div>
  );
};

export default Blog;
