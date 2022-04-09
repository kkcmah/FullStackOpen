import { createSlice } from "@reduxjs/toolkit";
import usersService from "../services/users";
import { setNotification } from "./notificationReducer";

const usersSlice = createSlice({
  name: "users",
  initialState: [],
  reducers: {
    setUsers(state, action) {
      return action.payload;
    },
  },
});

export const { setUsers } = usersSlice.actions;

export const initializeUsers = () => {
  return async (dispatch) => {
    try {
      const allUsers = await usersService.getAll();
      dispatch(setUsers(allUsers));
    } catch (error) {
      console.log(error);
      dispatch(setNotification("can't get users", true, 5));
    }
  };
};

export default usersSlice.reducer;
