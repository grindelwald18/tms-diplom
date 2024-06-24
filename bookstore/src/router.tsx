import { createBrowserRouter } from 'react-router-dom'
import { Layout } from './components/Layout'
import { Books } from './pages/Books'
import { Book } from './pages/Book'

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Books />
      },
      {
        path: '/book/:id',
        element: <Book />
      }
    ]
  }
])
