import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface NotFoundState {
  isNotFound: boolean;
  message: string | null;
}

const initialState: NotFoundState = {
  isNotFound: false,
  message: null,
};

export const notFoundSlice = createSlice({
  name: 'notFound',
  initialState,
  reducers: {
    setNotFound: (state, action: PayloadAction<boolean>) => {
      state.isNotFound = action.payload;
    },
    setMessage: (state, action: PayloadAction<string | null>) => {
      state.message = action.payload;
    },
    reset: (state) => {
      state.isNotFound = false;
      state.message = null;
    },
  },
});

export const { setNotFound, setMessage, reset } = notFoundSlice.actions;
export default notFoundSlice.reducer;