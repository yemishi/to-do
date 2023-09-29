import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Home from './routes/Home.jsx'
import AddTask from './routes/AddTask.jsx'
import Sketch from './Sketch.jsx'
import EditTask from './routes/EditTask.jsx'
import ErrorPage from './routes/ErrorPage.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const router = createBrowserRouter([
  {
    element: <App />,
    children: [{
      path: '/',
      element: <Home />
    },
    {
      path: '/new',
      element: <AddTask />
    },
    {
      path: '/edit/:id',
      element: <EditTask />
    },
    {
      path: '/sketch',
      element: <Sketch />
    },
    {
      path: '/error',
      element: <ErrorPage />
    }
    ]

  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode >,
)
