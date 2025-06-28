import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

/* 🔑  Import Bootstrap CSS once at the root */
import 'bootstrap/dist/css/bootstrap.min.css'

/* (optional) Your own styles – keep this line if you use index.css */
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
)
