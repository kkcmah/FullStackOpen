import { createSlice } from "@reduxjs/toolkit";
import blogsService from "../services/blogs";
import { setNotification } from "./notificationReducer";

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
    try {
      const createdBlog = await blogsService.createBlog(newBlog);
      dispatch(appendBlog(createdBlog));
    } catch (error) {
      dispatch(setNotification("Failed to create blog", true, 5));
    }
  };
};

export const addComment = (blogId, comment) => {
  return async (dispatch) => {
    try {
      const updatedBlog = await blogsService.addComment(blogId, comment);
      dispatch(updateBlog(updatedBlog));
    } catch (error) {
      dispatch(setNotification("Failed to comment", true, 5));
    }
  };
};

export const likeBlog = (blogToLike) => {
  return async (dispatch) => {
    try {
      const likedBlog = await blogsService.likeBlog(blogToLike);
      dispatch(updateBlog(likedBlog));
    } catch (error) {
      dispatch(setNotification("Failed to like blog", true, 5));
    }
  };
};

export const deleteBlog = (blogToDelete) => {
  return async (dispatch) => {
    try {
      await blogsService.deleteBlog(blogToDelete);
      dispatch(removeBlog(blogToDelete));
    } catch (error) {
      dispatch(setNotification("Failed to delete blog", true, 5));
    }
  };
};

export default blogSlice.reducer;
