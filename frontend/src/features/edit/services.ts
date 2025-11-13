import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Announcement, ApproveRejectResponse } from '@features/list/services';

export interface UpdateAnnouncementRequest {
  id: number;
  title?: string;
  description?: string;
  price?: number;
  category?: string;
}

export const editApi = createApi({
  reducerPath: 'editApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001/api/v1' }),
  tagTypes: ['Announcement'],
  endpoints: (builder) => ({
    getAnnouncementById: builder.query<Announcement, number>({
      query: (id) => ({ url: `/ads/${id}` }),
      providesTags: (_result, _error, id) => [{ type: 'Announcement' as const, id }],
    }),
    approveAnnouncement: builder.mutation<ApproveRejectResponse, number>({
      query: (id) => ({
        url: `/ads/${id}/approve`,
        method: 'POST',
      }),
      invalidatesTags: (_result, _error, id) => [{ type: 'Announcement' as const, id }],
    }),
    rejectAnnouncement: builder.mutation<ApproveRejectResponse, { id: number; reason: string; comment?: string }>({
      query: ({ id, reason, comment }) => ({
        url: `/ads/${id}/reject`,
        method: 'POST',
        body: { reason, ...(comment && { comment }) },
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: 'Announcement' as const, id }],
    }),
    requestChanges: builder.mutation<ApproveRejectResponse, { id: number; reason: string; comment?: string }>({
      query: ({ id, reason, comment }) => ({
        url: `/ads/${id}/request-changes`,
        method: 'POST',
        body: { reason, ...(comment && { comment }) },
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: 'Announcement' as const, id }],
    }),
  }),
});

export const {
  useGetAnnouncementByIdQuery,
  useApproveAnnouncementMutation,
  useRejectAnnouncementMutation,
  useRequestChangesMutation,
} = editApi;

