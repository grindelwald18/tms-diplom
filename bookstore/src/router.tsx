import { createBrowserRouter } from 'react-router-dom'
import { Layout } from './components/Layout'
import { Books } from './pages/Books'
import { Book } from './pages/Book'
import { LikeBooks } from './pages/LikeBooks'
import { ReadeBooks } from './pages/ReadeBooks'

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
      },
      {
        path: '/books/like',
        element: <LikeBooks />
      },
      {
        path: '/books/reade',
        element: <ReadeBooks />
      }
    ]
  }
])
