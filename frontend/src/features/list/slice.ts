import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Announcement, ListState } from "./type";



const initialState: ListState = {
  items: [],
  loading: false,
  error: null,
};

export const listSlice = createSlice({
  name: 'list',
  initialState,
  reducers: {
    setList: (state, action: PayloadAction<Announcement[]>) => {
      state.items = action.payload;
      state.loading = false;
      state.error = null;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { setList, setLoading, setError } = listSlice.actions;
export default listSlice.reducer;