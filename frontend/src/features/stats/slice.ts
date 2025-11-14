import { createSlice } from '@reduxjs/toolkit';
import type { StatsState, Period } from './type';

const initialState: StatsState = {
  metrics: null,
  chartData: null,
  period: '7days',
  loading: false,
  error: null,
};

const statsSlice = createSlice({
  name: 'stats',
  initialState,
  reducers: {
    setPeriod: (state, action: { payload: Period }) => {
      state.period = action.payload;
    },
  },
  selectors: {
    selectPeriod: (state) => state.period,
    selectMetrics: (state) => state.metrics,
    selectChartData: (state) => state.chartData,
    selectLoading: (state) => state.loading,
    selectError: (state) => state.error,
  },
});

export const { setPeriod } = statsSlice.actions;
export const { selectPeriod, selectMetrics, selectChartData, selectLoading, selectError } = statsSlice.selectors;
export default statsSlice.reducer;
