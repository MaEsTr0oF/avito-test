import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Announcement, GetAnnouncementsResponse, GetAnnouncementsParams, ApproveRejectResponse } from './type';


export const announcementsApi = createApi({
  reducerPath: 'announcementsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001/api/v1' }),
  tagTypes: ['Announcement', 'Announcements'],
  endpoints: (builder) => ({
    getAnnouncements: builder.query<GetAnnouncementsResponse, GetAnnouncementsParams>({
      query: (params) => {
        const queryParams: Record<string, string | number | string[]> = {};
        
        if (params.page !== undefined) queryParams.page = params.page;
        if (params.limit !== undefined) queryParams.limit = params.limit;
        if (params.categoryId !== undefined) queryParams.categoryId = params.categoryId;
        if (params.minPrice !== undefined) queryParams.minPrice = params.minPrice;
        if (params.maxPrice !== undefined) queryParams.maxPrice = params.maxPrice;
        if (params.search) queryParams.search = params.search;
        if (params.sortBy) queryParams.sortBy = params.sortBy;
        if (params.sortOrder) queryParams.sortOrder = params.sortOrder;
        if (params.priority) queryParams.priority = params.priority;
        
        if (params.status !== undefined) {
          queryParams.status = Array.isArray(params.status) ? params.status : params.status;
        }
        
        return { url: '/ads', params: queryParams };
      },
      providesTags: ['Announcements'],
    }),
    getAnnouncementById: builder.query<Announcement, number>({
      query: (id) => ({ url: `/ads/${id}` }),
      providesTags: (_result, _error, id) => [{ type: 'Announcement' as const, id }],
    }),
    approveAnnouncement: builder.mutation<ApproveRejectResponse, number>({
      query: (id) => ({
        url: `/ads/${id}/approve`,
        method: 'POST',
      }),
      invalidatesTags: (_result, _error, id) => [
        'Announcements',
        { type: 'Announcement' as const, id },
      ],
    }),
    rejectAnnouncement: builder.mutation<ApproveRejectResponse, { id: number; reason: string; comment?: string }>({
      query: ({ id, reason, comment }) => ({
        url: `/ads/${id}/reject`,
        method: 'POST',
        body: { reason, ...(comment && { comment }) },
      }),
      invalidatesTags: (_result, _error, { id }) => [
        'Announcements',
        { type: 'Announcement' as const, id },
      ],
    }),
    requestChanges: builder.mutation<ApproveRejectResponse, { id: number; reason: string; comment?: string }>({
      query: ({ id, reason, comment }) => ({
        url: `/ads/${id}/request-changes`,
        method: 'POST',
        body: { reason, ...(comment && { comment }) },
      }),
      invalidatesTags: (_result, _error, { id }) => [
        'Announcements',
        { type: 'Announcement' as const, id },
      ],
    }),
    updateAnnouncementStatus: builder.mutation<ApproveRejectResponse, { id: number; status: string; reason?: string; comment?: string }>({
      query: ({ id, status, reason, comment }) => {
        if (status === 'approved') {
          return {
            url: `/ads/${id}/approve`,
            method: 'POST',
          };
        } else if (status === 'rejected') {
          return {
            url: `/ads/${id}/reject`,
            method: 'POST',
            body: { reason, ...(comment && { comment }) },
          };
        }
        throw new Error(`Unknown status: ${status}`);
      },
      invalidatesTags: (_result, _error, { id }) => [
        'Announcements',
        { type: 'Announcement' as const, id },
      ],
    }),
  }),
});

export const {
  useGetAnnouncementsQuery,
  useGetAnnouncementByIdQuery,
  useApproveAnnouncementMutation,
  useRejectAnnouncementMutation,
  useRequestChangesMutation,
  useUpdateAnnouncementStatusMutation,
} = announcementsApi;