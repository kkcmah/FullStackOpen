import { useState } from "react";

const Blog = ({ blog }) => {
  const [show, setShow] = useState(false);
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };
  return (
    <div style={blogStyle}>
      {blog.title}
      <button onClick={() => setShow(!show)}>{show ? "hide" : "view"}</button>
      {show && (
        <>
          <div>{blog.url}</div>
          <div>{blog.likes}</div>
          <div>{blog.author}</div>
        </>
      )}
    </div>
  );
};

export default Blog;
