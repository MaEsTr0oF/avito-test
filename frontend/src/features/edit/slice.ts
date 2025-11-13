import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface EditState {
  item: any | null;
  loading: boolean;
  error: string | null;
  isSaving: boolean;
}

const initialState: EditState = {
  item: null,
  loading: false,
  error: null,
  isSaving: false,
};

export const editSlice = createSlice({
  name: 'edit',
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
    setIsSaving: (state, action: PayloadAction<boolean>) => {
      state.isSaving = action.payload;
    },
    updateItem: (state, action: PayloadAction<Partial<any>>) => {
      if (state.item) {
        state.item = { ...state.item, ...action.payload };
      }
    },
    clearItem: (state) => {
      state.item = null;
      state.error = null;
    },
  },
});

export const { setItem, setLoading, setError, setIsSaving, updateItem, clearItem } = editSlice.actions;
export default editSlice.reducer;
