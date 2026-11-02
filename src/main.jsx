import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import { store } from './store.js'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Cards from './pages/Cards.jsx'
import Card from './card/components/Card.jsx'
import ProtectedRoute from './auth/components/ProtectedRoute.jsx'
import Login from './auth/Login.jsx'
import PublicRoute from './auth/components/PublicRoute.jsx'
import Register from './auth/Register.jsx'
import { CardComplete } from './pages/CardComplete.jsx'


const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>
  },
  {
    path: "/register",
    element: <PublicRoute><Register></Register></PublicRoute>
  },
    {
    path: "/login",
    element: <PublicRoute> <Login/> </PublicRoute>
  },
  {
    path: "allCards",
    element: <Cards></Cards>
  },
  {
    path: "/allCards/:cardId",
    element: <ProtectedRoute><CardComplete></CardComplete></ProtectedRoute>
  }
])
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store = {store}>
    <RouterProvider router = {router}/>
    </Provider>
  </StrictMode>,
)
