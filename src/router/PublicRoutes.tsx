import { apiRequest } from '@/libs/axios/apiRequest'
import { lazy } from 'react'
import { Navigate, RouteObject } from 'react-router-dom'

export default function PublicRoutes(): RouteObject[] {
  const MainLayout = lazy(() => import('@/components/layouts/MainLayout'))
  const MainPage = lazy(() => import('@/app/(users)/Page'))

  return [
    {
      path: '/',
      element: <MainLayout />,
      children: [
        {
          path: '',
          element: <Navigate to={'/users'} replace />,
        },
        {
          path: '*',
          element: <Navigate to={'/users'} replace />,
        },
        {
          path: 'users',
          element: <MainPage />,
          loader: async () => {
            const defaultUsers = (await apiRequest.get('/users')).data
            return { defaultUsers }
          },
        },
      ],
    },
  ]
}
