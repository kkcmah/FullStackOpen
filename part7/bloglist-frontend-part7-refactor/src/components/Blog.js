import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { likeBlog, deleteBlog } from "../reducers/blogReducer";

const Blog = ({ blog }) => {
  const [show, setShow] = useState(false);
  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const showRemoveBtn = blog.user
    ? blog.user.id === user.id || blog.user === user.id
    : false;

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const handlelikeBlog = () => {
    dispatch(likeBlog(blog));
  };

  const handledeleteBlog = () => {
    const delBlog = window.confirm(
      `Remove blog ${blog.title} by ${blog.author}?`
    );
    if (delBlog) dispatch(deleteBlog(blog));
  };

  return (
    <div style={blogStyle} className="blog">
      {blog.title}
      <button className="detail-btn" onClick={() => setShow(!show)}>
        {show ? "hide" : "view"}
      </button>
      {show && (
        <>
          <div>{blog.url}</div>
          <div>
            {blog.likes}{" "}
            <button className="like-btn" onClick={handlelikeBlog}>
              like
            </button>
          </div>
          <div>{blog.author}</div>
          {showRemoveBtn && (
            <button className="delete-btn" onClick={handledeleteBlog}>
              remove
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default Blog;
