import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  city: "",
  dates: [{ startDate: "", endDate: "" }],
  options: {
    adult: 1,
    children: 0,
    room: 1,
  },
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchParams: (state, action) => {
      state.city = action.payload.city;
      state.dates = action.payload.dates;
      state.options = action.payload.options;
    },
    resetSearch: () => initialState,
  },
});

export const { setSearchParams, resetSearch } = searchSlice.actions;
export default searchSlice.reducer;
