import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAllHotels = createAsyncThunk(
  "allHotels/fetchAllHotels",
  async () => {
    const response = await axios.get("http://localhost:5555/api/hotels");
    return response.data;
  }
);

export const addToWishlist = createAsyncThunk(
  "wishlist/addToWishlist",
  async (hotelData) => {
    const response = await axios.get("http://localhost:5555/api/wishlist");
    const wishlistItems = response.data;

    const isAlreadyInWishlist = wishlistItems.some(item => item._id === hotelData._id);

    if (isAlreadyInWishlist) {
      alert("This item is already in your wishlist");
      return;
    }

    const postResponse = await axios.post("http://localhost:5555/api/wishlist", hotelData);
    return postResponse.data;
  }
);

// Yeni delete funksiyası əlavə edirik
export const deleteFromWishlist = createAsyncThunk(
  "wishlist/deleteFromWishlist",
  async (hotelId) => {
    await axios.delete(`http://localhost:5555/api/wishlist/${hotelId}`);
    return hotelId;  // Silinən hotelın ID-sini geri qaytarırıq
  }
);

const allHotelsSlice = createSlice({
  name: "allHotels",
  initialState: {
    data: [],
    loading: false,
    error: null,
    wishlist: [],
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
      })
      
      .addCase(addToWishlist.pending, (state) => {
        state.loading = true;
      })
      .addCase(addToWishlist.fulfilled, (state, action) => {
        state.loading = false;
        state.wishlist.push(action.payload);
      })
      .addCase(addToWishlist.rejected, (state) => {
        state.loading = false;
        state.error = null;
      })
      
      // Yeni delete case əlavə edirik
      .addCase(deleteFromWishlist.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteFromWishlist.fulfilled, (state, action) => {
        state.loading = false;
        state.wishlist = state.wishlist.filter(item => item._id !== action.payload); // Silinmiş hotelı wishlist-dən çıxarırıq
      })
      .addCase(deleteFromWishlist.rejected, (state) => {
        state.loading = false;
        state.error = null;
      });
  }
});

export default allHotelsSlice.reducer;
