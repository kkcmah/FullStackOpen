import { createSlice } from "@reduxjs/toolkit";
import blogsService from "../services/blogs";
import loginService from "../services/login";
import { setNotification } from "./notificationReducer";

const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    setUser(state, action) {
      return action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;

export const loginUser = (username, password) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login({ username, password });
      blogsService.setToken(user.token);
      dispatch(setUser(user));
      window.localStorage.setItem("user", JSON.stringify(user));
    } catch (error) {
      dispatch(setNotification("wrong username or password", true, 5));
    }
  };
};

export const logoutUser = () => {
  return async (dispatch) => {
    blogsService.setToken("removed");
    window.localStorage.removeItem("user");
    dispatch(setUser(null));
  };
};

export const loadUserLocalStorage = () => {
  return async (dispatch) => {
    const locStoUser = window.localStorage.getItem("user");
    try {
      if (locStoUser) {
        const userParsed = JSON.parse(locStoUser);
        dispatch(setUser(userParsed));
        blogsService.setToken(userParsed.token);
      }
    } catch (error) {
      console.log("error with local storage");
      window.localStorage.removeItem("user");
    }
  };
};

export default userSlice.reducer;
