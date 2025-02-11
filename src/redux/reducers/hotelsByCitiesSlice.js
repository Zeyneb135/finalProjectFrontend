// hotelsByCitiesSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchHotelsByCities = createAsyncThunk(
  "hotelsByCities/fetchHotelsByCities",
  async () => {
    const response = await axios.get(
      "http://localhost:5555/api/hotels/countByCity/?cities=istanbul,izmir,ankara,antalya"
    );
    return response.data;
  }
);

const hotelsByCitiesSlice = createSlice({
  name: "hotelsByCities",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchHotelsByCities.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchHotelsByCities.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchHotelsByCities.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default hotelsByCitiesSlice.reducer;

