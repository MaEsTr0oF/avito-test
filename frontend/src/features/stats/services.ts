import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface SummaryStats {
  total: number;
  pending: number;
  approved: number;
  rejected: number;
  averageModerationTime: number;
}

export interface ChartDataPoint {
  date: string;
  value: number;
}

export interface ActivityChartData {
  data: ChartDataPoint[];
}

export interface DecisionsChartData {
  approved: number;
  rejected: number;
  requestedChanges: number;
}

export interface CategoriesChartData {
  category: string;
  count: number;
}

export const statsApi = createApi({
  reducerPath: 'statsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001/api/v1' }),
  tagTypes: ['Stats'],
  endpoints: (builder) => ({
    getSummaryStats: builder.query<SummaryStats, void>({
      query: () => ({ url: '/stats/summary' }),
      providesTags: ['Stats'],
    }),
    getActivityChart: builder.query<ActivityChartData, void>({
      query: () => ({ url: '/stats/chart/activity' }),
      providesTags: ['Stats'],
    }),
    getDecisionsChart: builder.query<DecisionsChartData, void>({
      query: () => ({ url: '/stats/chart/decisions' }),
      providesTags: ['Stats'],
    }),
    getCategoriesChart: builder.query<CategoriesChartData[], void>({
      query: () => ({ url: '/stats/chart/categories' }),
      providesTags: ['Stats'],
    }),
  }),
});

export const {
  useGetSummaryStatsQuery,
  useGetActivityChartQuery,
  useGetDecisionsChartQuery,
  useGetCategoriesChartQuery,
} = statsApi;

