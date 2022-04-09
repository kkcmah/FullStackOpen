import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { likeBlog, deleteBlog, addComment } from "../reducers/blogReducer";
import { setNotification } from "../reducers/notificationReducer";

const Blog = () => {
  const [comment, setComment] = useState("");
  const { id } = useParams();
  const user = useSelector((state) => state.user);
  const blog = useSelector((state) =>
    state.blogs.find((blog) => blog.id === id)
  );
  const blogMaker = useSelector((state) => {
    if (!blog) return null;
    return state.users.find(
      (user) => blog.user.id === user.id || blog.user === user.id
    );
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (!blog || !user) return null;

  const showRemoveBtn = blog.user
    ? blog.user.id === user.id || blog.user === user.id
    : false;

  const handlelikeBlog = () => {
    dispatch(likeBlog(blog));
    dispatch(setNotification("liked blog", false, 5));
  };

  const handledeleteBlog = () => {
    const delBlog = window.confirm(
      `Remove blog ${blog.title} by ${blog.author}?`
    );
    if (delBlog) {
      dispatch(deleteBlog(blog));
      dispatch(setNotification(`${blog.title} deleted`, false, 5));
      navigate("/");
    }
  };

  const handleAddComment = () => {
    dispatch(addComment(blog.id, { comment }));
    setComment("");
  };

  return (
    <div>
      <h2>{blog.title}</h2>
      <div>{blog.author}</div>
      <div>{blog.url}</div>
      <div>
        {blog.likes}
        <button className="like-btn" onClick={handlelikeBlog}>
          like
        </button>
      </div>
      {blogMaker && <div>added by {blogMaker.name}</div>}
      {showRemoveBtn && (
        <button className="delete-btn" onClick={handledeleteBlog}>
          remove
        </button>
      )}
      <h3>comments</h3>
      <input
        type="text"
        name="comment"
        placeholder="Enter comment here"
        value={comment}
        onChange={({ target }) => setComment(target.value)}
      ></input>
      <button onClick={handleAddComment}>add comment</button>
      <ul>
        {blog.comments.map((comment, index) => (
          <li key={index}>{comment}</li>
        ))}
      </ul>
    </div>
  );
};

export default Blog;
