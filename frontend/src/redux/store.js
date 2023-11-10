// store.js
import { configureStore } from '@reduxjs/toolkit';
import modalReducer from './modalSlice';

const store = configureStore({
  reducer: {
    modal: modalReducer,
    // Add other reducers if needed
  },
}); 

export default store;
