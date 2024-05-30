import { createBrowserRouter } from 'react-router-dom'
import PublicRoutes from './PublicRoutes'

const Router = createBrowserRouter([...PublicRoutes()])

export default Router
