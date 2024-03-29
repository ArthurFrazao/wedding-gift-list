import { createBrowserRouter } from 'react-router-dom'

import { Home } from './pages/Home'
import { Ceremony } from './pages/Ceremony'
import { GiftsList } from './pages/GiftsList'
import { ConfirmPresence } from './pages/ConfirmPresence'

import { PageNotFound } from './pages/PageNotFound'
import { AddSuggestion } from './pages/AddSuggestion'

export const router = createBrowserRouter([
  {
    path: '*',
    element: <PageNotFound />
  },
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/home',
    element: <Home />
  },
  {
    path: '/category/gift-list',
    element: <GiftsList />
  },
  {
    path: '/category/gift-list/add-suggestion',
    element: <AddSuggestion />
  },
  {
    path: '/category/ceremony',
    element: <Ceremony />
  },
  {
    path: '/category/confirm-presence',
    element: <ConfirmPresence />
  }
])
