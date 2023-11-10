// modalSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoginModalOpen: false,
  isRegistrationModalOpen: false,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openLoginModal: (state) => {
      state.isLoginModalOpen = true;
    },
    closeLoginModal: (state) => {
      state.isLoginModalOpen = false;
    },
    openRegistrationModal: (state) => {
      state.isRegistrationModalOpen = true;
    },
    closeRegistrationModal: (state) => {
      state.isRegistrationModalOpen = false;
    },
  },
});

export const {
  openLoginModal,
  closeLoginModal,
  openRegistrationModal,
  closeRegistrationModal,
} = modalSlice.actions;

export default modalSlice.reducer;
