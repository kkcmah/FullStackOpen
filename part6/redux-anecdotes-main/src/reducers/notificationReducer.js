import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: "initial notification state",
  reducers: {
    setNotif(state, action) {
      return action.payload;
    },
    removeNotification(state, action) {
      return null;
    },
  },
});

export const { setNotif, removeNotification } = notificationSlice.actions;

export const setNotification = (msg, timeSeconds) => {
  return async (dispatch) => {
    dispatch(setNotif(msg));
    setTimeout(() => {
      dispatch(removeNotification());
    }, timeSeconds * 1000);
  };
};

export default notificationSlice.reducer;
