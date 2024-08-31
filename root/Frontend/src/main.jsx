import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import store from "./store/Store.js"
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Protected } from "./components/index.js"

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
