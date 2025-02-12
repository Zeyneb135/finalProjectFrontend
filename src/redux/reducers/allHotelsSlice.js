import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Otelləri əldə etmək üçün GET əməliyyatı
export const fetchAllHotels = createAsyncThunk(
  "allHotels/fetchAllHotels",
  async () => {
    const response = await axios.get("http://localhost:5555/api/hotels");
    return response.data;
  }
);

// Wishlist-ə otel əlavə etmək üçün POST əməliyyatı
export const addToWishlist = createAsyncThunk(
  "wishlist/addToWishlist",
  async (hotelData, { getState }) => {
    const state = getState();
    
    // Serverdan en son veriyi çekip kontrol etme
    const response = await axios.get("http://localhost:5555/api/wishlist");
    const wishlistItems = response.data;
    
    // Wishlist-də artıq bu məhsul varmı?
    const isAlreadyInWishlist = wishlistItems.some(item => item._id === hotelData._id);
    
    if (isAlreadyInWishlist) {
      // Alert ilə mesaj göstəririk
      alert("This item is already in your wishlist");
      return;  // işlemi sonlandırıyoruz
    }
    
    const postResponse = await axios.post("http://localhost:5555/api/wishlist", hotelData);
    return postResponse.data; // Yeni otel məlumatı
  }
);


const allHotelsSlice = createSlice({
  name: "allHotels",
  initialState: {
    data: [], // Otellər məlumatı
    loading: false,
    error: null,
    wishlist: [], // Wishlistə əlavə edilmiş otellər
  },
  extraReducers: (builder) => {
    builder
      // GET əməliyyatı üçün reducers
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
  
      // POST əməliyyatı üçün reducers (Wishlist-ə otel əlavə edilməsi)
      .addCase(addToWishlist.pending, (state) => {
        state.loading = true;
      })
      .addCase(addToWishlist.fulfilled, (state, action) => {
        state.loading = false;
        // Yeni otel məlumatını wishlistə əlavə edirik
        state.wishlist.push(action.payload);
      })
      .addCase(addToWishlist.rejected, (state) => {
        state.loading = false;
        state.error = null; // Hata mesajını sıfırlıyoruz
      });
      
      
  }
});

export default allHotelsSlice.reducer;
