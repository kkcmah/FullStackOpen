import { useState } from "react";

const Blog = ({ blog, handleLikeBlog, user, handleDeleteBlog }) => {
  const [show, setShow] = useState(false);

  const showRemoveBtn = blog.user
    ? blog.user.username === user.username
    : false;

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

  const deleteBlog = () => {
    const delBlog = window.confirm(
      `Remove blog ${blog.title} by ${blog.author}?`
    );
    if (delBlog) handleDeleteBlog(blog);
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
          {showRemoveBtn && <button onClick={deleteBlog}>remove</button>}
        </>
      )}
    </div>
  );
};

export default Blog;
