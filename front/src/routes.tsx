import { createBrowserRouter } from 'react-router-dom'

import { Home } from './pages/Home'
import { Category } from './pages/Category'

export const router = createBrowserRouter([
  {
    path: '*',
    element: <Home />
  },
  {
    path: '/home',
    element: <Home />
  },
  {
    path: '/category/:category',
    element: <Category />
  }
])
