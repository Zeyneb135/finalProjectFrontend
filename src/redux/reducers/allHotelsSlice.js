// allHotelsSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAllHotels = createAsyncThunk(
  "allHotels/fetchAllHotels",
  async () => {
    const response = await axios.get("http://localhost:5555/api/hotels");
    return response.data;
  }
);

const allHotelsSlice = createSlice({
  name: "allHotels",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllHotels.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllHotels.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchAllHotels.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default allHotelsSlice.reducer;
