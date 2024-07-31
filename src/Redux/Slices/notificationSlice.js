// notificationSlice.js
import { createSlice } from '@reduxjs/toolkit';
 
const notificationSlice = createSlice({
  name: 'notification',
  initialState: {
    open: false,
    severity: 'info',
    message: '',
  },
  reducers: {
    showNotification: (state, action) => {
      state.open = true;
      state.severity = action.payload.severity;
      state.message = action.payload.message.toUpperCase();
    },
    clearNotification: (state) => {
      state.open = false;
      state.severity = 'info';
      state.message = '';
    },
  },
});
 
export const { showNotification, clearNotification } = notificationSlice.actions;
export default notificationSlice.reducer;