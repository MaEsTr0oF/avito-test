import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Announcement } from '@features/list/services';

export const itemApi = createApi({
  reducerPath: 'itemApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001/api/v1' }),
  tagTypes: ['Announcement'],
  endpoints: (builder) => ({
    getAnnouncementById: builder.query<Announcement, number>({
      query: (id) => ({ url: `/ads/${id}` }),
      providesTags: (_result, _error, id) => [{ type: 'Announcement' as const, id }],
    }),
  }),
});

export const { useGetAnnouncementByIdQuery } = itemApi;

