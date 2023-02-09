import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'

import { router } from './routes'
import { ModalProvider } from './context/ModalContext'

import './index.css'
import { GiftProvider } from './context/GiftContext'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <GiftProvider>
      <ModalProvider>
        <RouterProvider router={router} />
      </ModalProvider>
    </GiftProvider>
  </React.StrictMode>
)
