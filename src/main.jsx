import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Home from './routes/Home.jsx'
import AddTask from './routes/AddTask.jsx'
import EditTask from './routes/EditTask.jsx'
import ErrorPage from './routes/ErrorPage.jsx'
import Login from './routes/Login.jsx'
import Validation from './routes/Validation.jsx'
import EditUser from './routes/EditUser.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: '/login',
        element: <Login />
      },
      {
        path: "/editUser/:userName",
        element: <EditUser />
      },
      {
        path: '/home',
        element: <Home />
      }, {
        path: '/Validation',
        element: <Validation />
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
        path: '/*',
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
