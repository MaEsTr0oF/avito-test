import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { StatsResponse, Period } from './type';
import type { GetAnnouncementsResponse } from '@/features/list/type';
import { transformAnnouncementsToStats } from './dataAdapter';

export const statsApi = createApi({
  reducerPath: 'statsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001/api/v1' }),
  tagTypes: ['Stats'],
  endpoints: (builder) => ({
    getStats: builder.query<StatsResponse, Period>({
      query: () => ({
        url: '/ads',
        params: {
          page: 1,
          limit: 1000,
        },
      }),
      transformResponse: (response: GetAnnouncementsResponse, _meta, period) => {
        return transformAnnouncementsToStats(response.ads, period);
      },
      providesTags: ['Stats'],
    }),
  }),
});

export const { useGetStatsQuery } = statsApi;
