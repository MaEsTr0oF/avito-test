import { configureStore } from '@reduxjs/toolkit'
import listReducer from '@features/list/slice'
import itemReducer from '@features/item/slice'
import editReducer from '@features/edit/slice'
import statsReducer from '@features/stats/slice'
import notFoundReducer from '@features/not-found/slice'
import { announcementsApi } from '@features/list/services'
import { itemApi } from '@features/item/services'
import { editApi } from '@features/edit/services'
import { statsApi } from '@features/stats/services'

export const store = configureStore({
  reducer: {
    list: listReducer,
    item: itemReducer,
    edit: editReducer,
    stats: statsReducer,
    notFound: notFoundReducer,
    [announcementsApi.reducerPath]: announcementsApi.reducer,
    [itemApi.reducerPath]: itemApi.reducer,
    [editApi.reducerPath]: editApi.reducer,
    [statsApi.reducerPath]: statsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      announcementsApi.middleware,
      itemApi.middleware,
      editApi.middleware,
      statsApi.middleware
    ),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch