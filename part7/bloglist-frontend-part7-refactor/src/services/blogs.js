import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const getAll = () => {
  const config = {
    headers: { Authorization: token },
  };
  const request = axios.get(baseUrl, config);
  return request.then((response) => response.data);
};

const createBlog = (blog) => {
  const config = {
    headers: { Authorization: token },
  };
  const request = axios.post(baseUrl, blog, config);
  return request.then((response) => response.data);
};

const likeBlog = (blog) => {
  const config = {
    headers: { Authorization: token },
  };
  const likedBlog = { blog, likes: blog.likes + 1 };
  const request = axios.put(`${baseUrl}/${blog.id}`, likedBlog, config);
  return request.then((response) => response.data);
};

const deleteBlog = (blog) => {
  const config = {
    headers: { Authorization: token },
  };
  const request = axios.delete(`${baseUrl}/${blog.id}`, config);
  return request.then((response) => response.data);
};

const blogsService = { setToken, getAll, createBlog, likeBlog, deleteBlog };
export default blogsService;
