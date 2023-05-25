import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    set: (state, action) => action.payload,
    clear: () => '',
  },
});

const { set, clear } = notificationSlice.actions;

let notificationTimer = null;

export const setNotification = (message, seconds) => {
  return async (dispatch) => {
    dispatch(set(message));

    if (notificationTimer) {
      clearTimeout(notificationTimer);
    }

    notificationTimer = setTimeout(() => {
      dispatch(clear());
      notificationTimer = null;
    }, seconds * 1000);
  };
};

export default notificationSlice.reducer;
