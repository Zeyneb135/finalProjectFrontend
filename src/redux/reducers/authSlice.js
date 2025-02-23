import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: JSON.parse(localStorage.getItem('user')) || null,  // LocalStorage-dən istifadəçi məlumatlarını alırıq
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.user = action.payload;  // Burada isAdmin məlumatı da olacaq
      state.loading = false;
      state.error = null;
      localStorage.setItem('user', JSON.stringify(action.payload));  // LocalStorage-a istifadəçi məlumatlarını saxlayırıq
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.loading = false;
      state.error = null;
      localStorage.removeItem('user');  // Logout zamanı localStorage təmizlənir
      localStorage.removeItem('access_token');  // Tokeni də silirik
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, logout } = authSlice.actions;
export default authSlice.reducer;
