import { useState } from "react";

const BlogForm = ({ handleCreateBlog }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const addBlog = (event) => {
    event.preventDefault();
    handleCreateBlog({ title, author, url });
    setTitle("");
    setAuthor("");
    setUrl("");
  };

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <div>
          title:
          <input
            type="text"
            value={title}
            onChange={({ target }) => {
              setTitle(target.value);
            }}
          ></input>
        </div>
        <div>
          author:
          <input
            type="text"
            value={author}
            onChange={({ target }) => {
              setAuthor(target.value);
            }}
          ></input>
        </div>
        <div>
          url:
          <input
            type="text"
            value={url}
            onChange={({ target }) => {
              setUrl(target.value);
            }}
          ></input>
        </div>

        <button type="submit">create</button>
      </form>
    </>
  );
};

export default BlogForm;
