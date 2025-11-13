import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface StatsState {
  stats: any[];
  loading: boolean;
  error: string | null;
}

const initialState: StatsState = {
  stats: [],
  loading: false,
  error: null,
};

export const statsSlice = createSlice({
  name: 'stats',
  initialState,
  reducers: {
    setStats: (state, action: PayloadAction<any[]>) => {
      state.stats = action.payload;
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

export const { setStats, setLoading, setError } = statsSlice.actions;
export default statsSlice.reducer;