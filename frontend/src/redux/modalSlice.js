// modalSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoginModalOpen: false,
  isRegistrationModalOpen: false,
  userId: 0,
  recieverName: '',
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
    changeId : (state, action)=>{
      state.userId = action.payload;
    },
    changeRecieverName: (state, action)=>{
      state.recieverName = action.payload;
    }
  },
});

export const {
  openLoginModal,
  closeLoginModal,
  openRegistrationModal,
  closeRegistrationModal,
  changeId,
  changeRecieverName,
} = modalSlice.actions;

export default modalSlice.reducer;
