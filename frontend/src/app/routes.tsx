
import { lazy } from 'react'
const routes = [
  { path: '/stats', element: lazy(() => import('@features/stats/StatisticsPage')) },
  { path: '/404', element: lazy(() => import('@features/not-found/NotFoundPage')) },
  { path: '/', element: lazy(() => import('@features/list/ListPage')) },
  { path: '/list', element: lazy(() => import('@features/list/ListPage')) },
  { path: '*', element: lazy(() => import('@features/not-found/NotFoundPage')) },
  { path: '/item/:id', element: lazy(() => import('@features/item/ItemPage')) },
  { path: '/edit/:id', element: lazy(() => import('@features/edit/EditPage')) },
] as const

export default routes