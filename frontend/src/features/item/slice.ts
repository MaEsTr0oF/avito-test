import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface ItemState {
  item: any | null;
  loading: boolean;
  error: string | null;
}

const initialState: ItemState = {
  item: null,
  loading: false,
  error: null,
};

export const itemSlice = createSlice({
  name: 'item',
  initialState,
  reducers: {
    setItem: (state, action: PayloadAction<any>) => {
      state.item = action.payload;
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
    clearItem: (state) => {
      state.item = null;
      state.error = null;
    },
  },
});

export const { setItem, setLoading, setError, clearItem } = itemSlice.actions;
export default itemSlice.reducer;
