import { createBrowserRouter } from 'react-router-dom'
import { Layout } from './components/Layout'
import { Books } from './pages/Books'

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Books />
      }
    ]
  }
])  