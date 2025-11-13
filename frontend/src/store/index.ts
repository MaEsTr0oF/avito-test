import { configureStore } from '@reduxjs/toolkit'
import listReducer from '@features/list/slice'
import itemReducer from '@features/item/slice'
import editReducer from '@features/edit/slice'
import statsReducer from '@features/stats/slice'
import notFoundReducer from '@features/not-found/slice'

export const store = configureStore({
  reducer: {
    list: listReducer,
    item: itemReducer,
    edit: editReducer,
    stats: statsReducer,
    notFound: notFoundReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch