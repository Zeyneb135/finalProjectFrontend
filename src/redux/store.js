import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers/authSlice';
import searchReducer from './reducers/searchSlice'; 
import hotelReducer from './reducers/hotelsByCitiesSlice'
import allHotelsReducer from "./reducers/allHotelsSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    search: searchReducer, 
    fetchHotelsByCities: hotelReducer,
    allHotels: allHotelsReducer,
  },
});
