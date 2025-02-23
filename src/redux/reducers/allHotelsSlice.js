import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Fetch all hotels (No token required)
export const fetchAllHotels = createAsyncThunk(
  "allHotels/fetchAllHotels",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("http://localhost:5555/api/hotels");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error fetching hotels");
    }
  }
);

// Add hotel (No token required)
export const addHotel = createAsyncThunk(
  "allHotels/addHotel",
  async (hotelData, { rejectWithValue }) => {
    try {
      const response = await axios.post("http://localhost:5555/api/hotels", hotelData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error adding hotel");
    }
  }
);

// Add to wishlist (No token required)
export const addToWishlist = createAsyncThunk(
  "wishlist/addToWishlist",
  async (hotelData, { rejectWithValue }) => {
    try {
      const response = await axios.get("http://localhost:5555/api/wishlist");
      const wishlistItems = response.data;

      const isAlreadyInWishlist = wishlistItems.some(
        (item) => item._id === hotelData._id
      );

      if (isAlreadyInWishlist) {
        alert("This item is already in your wishlist");
        return;
      }

      const postResponse = await axios.post("http://localhost:5555/api/wishlist", hotelData);
      return postResponse.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error adding to wishlist");
    }
  }
);

// Delete from wishlist (No token required)
export const deleteFromWishlist = createAsyncThunk(
  "wishlist/deleteFromWishlist",
  async (hotelId, { rejectWithValue }) => {
    try {
      await axios.delete(`http://localhost:5555/api/wishlist/${hotelId}`);
      return hotelId;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error deleting from wishlist");
    }
  }
);

// Delete hotel (No token required)
export const deleteHotel = createAsyncThunk(
  "allHotels/deleteHotel",
  async (hotelId, { rejectWithValue }) => {
    try {
      await axios.delete(`http://localhost:5555/api/hotels/${hotelId}`);
      return hotelId;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error deleting hotel");
    }
  }
);

// Hotels slice
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
        state.error = action.payload;
      })

      .addCase(addToWishlist.pending, (state) => {
        state.loading = true;
      })
      .addCase(addToWishlist.fulfilled, (state, action) => {
        state.loading = false;
        state.wishlist.push(action.payload);
      })
      .addCase(addToWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(deleteFromWishlist.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteFromWishlist.fulfilled, (state, action) => {
        state.loading = false;
        state.wishlist = state.wishlist.filter(
          (item) => item._id !== action.payload
        );
      })
      .addCase(deleteFromWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(deleteHotel.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteHotel.fulfilled, (state, action) => {
        state.loading = false;
        state.data = state.data.filter((hotel) => hotel._id !== action.payload);
      })
      .addCase(deleteHotel.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(addHotel.pending, (state) => {
        state.loading = true;
      })
      .addCase(addHotel.fulfilled, (state, action) => {
        state.loading = false;
        state.data.push(action.payload);
      })
      .addCase(addHotel.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default allHotelsSlice.reducer;
