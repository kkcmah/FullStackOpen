import { createSlice } from "@reduxjs/toolkit";
import blogsService from "../services/blogs";

const blogSlice = createSlice({
  name: "blog",
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload;
    },
    appendBlog(state, action) {
      return [...state, action.payload];
    },
    updateBlog(state, action) {
      const updatedBlog = action.payload;
      return state.map((blog) =>
        blog.id !== updatedBlog.id ? blog : updatedBlog
      );
    },
    removeBlog(state, action) {
      const deletedBlog = action.payload;
      return state.filter((blog) => blog.id !== deletedBlog.id);
    },
  },
});

export const { setBlogs, appendBlog, updateBlog, removeBlog } =
  blogSlice.actions;

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogsService.getAll();
    dispatch(setBlogs(blogs));
  };
};

export const createBlog = (newBlog) => {
  return async (dispatch) => {
    const createdBlog = await blogsService.createBlog(newBlog);
    dispatch(appendBlog(createdBlog));
  };
};

export const likeBlog = (blogToLike) => {
  return async (dispatch) => {
    const likedBlog = await blogsService.likeBlog(blogToLike);
    dispatch(updateBlog(likedBlog));
  };
};

export const deleteBlog = (blogToDelete) => {
  return async (dispatch) => {
    const deletedBlog = await blogsService.deleteBlog(blogToDelete);
    dispatch(removeBlog(deletedBlog));
  };
};

export default blogSlice.reducer;
