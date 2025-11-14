import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { ItemState, AnnouncementDetail } from './type';

const initialState: ItemState = {
  currentItem: null,
  loading: false,
  error: null,
};

export const itemSlice = createSlice({
  name: 'item',
  initialState,
  reducers: {
    setCurrentItem: (state, action: PayloadAction<AnnouncementDetail | null>) => {
      state.currentItem = action.payload;
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
    clearCurrentItem: (state) => {
      state.currentItem = null;
      state.error = null;
      state.loading = false;
    },
  },
  selectors: {
    selectCurrentItem: (state) => state.currentItem,
    selectLoading: (state) => state.loading,
    selectError: (state) => state.error,
  },
});

export const {
  setCurrentItem,
  setLoading,
  setError,
  clearCurrentItem,
} = itemSlice.actions;

export const {
  selectCurrentItem,
  selectLoading,
  selectError,
} = itemSlice.selectors;

export default itemSlice.reducer;
