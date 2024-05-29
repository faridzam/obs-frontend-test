import { apiRequest } from "@/libs/axios/apiRequest"
import { lazy } from "react"
import { Navigate, RouteObject } from "react-router-dom"

export default function PublicRoutes(): RouteObject[] {

  const MainLayout = lazy(() => import("@/components/layouts/MainLayout"))
  const MainPage = lazy(() => import("@/app/(users)/Page"))
  
  return [
    {
      path: "/",
      element: <MainLayout />,
      children: [
        {
          path: "",
          element: <Navigate to={'/users'} replace />
        },
        {
          path: "*",
          element: <Navigate to={'/users'} replace />
        },
        {
          path: "users",
          element: <MainPage />,
          loader: async () => {
            // let users: User[] = []
            // console.log(store.getState()._persist)
            // if (store.getState().user.users && store.getState().user.users.length <= 0) {
            //   try {
            //     const defaultUser = (await apiRequest.get('/users')).data
            //     users = defaultUser
            //   } catch (error) {
            //     console.log(error)
            //   }
            // } else {
            //   users = store.getState().user.users
            // }
            // store.dispatch(setUser(users))
            const defaultUser = (await apiRequest.get('/users')).data
            return {defaultUser}
          }
        },
      ]
    },
  ]
}