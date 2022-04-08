import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: { msg: null, err: false },
  reducers: {
    setNotif(state, action) {
      return { msg: action.payload.msg, err: action.payload.err };
    },
    // eslint-disable-next-line no-unused-vars
    removeNotif(state, action) {
      return { msg: null, err: false };
    },
  },
});

export const { setNotif, removeNotif } = notificationSlice.actions;

let timeoutID = null;

export const setNotification = (msg, err, timeSeconds) => {
  return async (dispatch) => {
    dispatch(setNotif({ msg, err }));
    clearTimeout(timeoutID);
    timeoutID = setTimeout(() => {
      dispatch(removeNotif());
    }, timeSeconds * 1000);
  };
};

export default notificationSlice.reducer;
