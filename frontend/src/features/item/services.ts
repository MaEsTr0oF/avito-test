import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type {
  GetAnnouncementByIdResponse,
  UpdateStatusResponse,
  UpdateStatusPayload,
} from './type';

export const itemApi = createApi({
  reducerPath: 'itemApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001/api/v1' }),
  tagTypes: ['Announcement'],
  endpoints: (builder) => ({
    getAnnouncementById: builder.query<GetAnnouncementByIdResponse, number>({
      query: (id) => `/ads/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'Announcement', id }],
    }),
    updateAnnouncementStatus: builder.mutation<UpdateStatusResponse, UpdateStatusPayload>({
      query: ({ id, status, reason }) => ({
        url: `/ads/${id}/status`,
        method: 'PUT',
        body: { status, reason },
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: 'Announcement', id },
        { type: 'Announcement', id: 'LIST' },
      ],
      async onQueryStarted({ id, status }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          itemApi.util.updateQueryData('getAnnouncementById', id, (draft) => {
            if (draft.ad) {
              draft.ad.status = status;
            }
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),
  }),
});

export const {
  useGetAnnouncementByIdQuery,
  useUpdateAnnouncementStatusMutation,
} = itemApi;
