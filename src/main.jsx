import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/tokens.css'
import './index.css'
import { CartProvider } from './context/CartContext.jsx'
import { DisponibilidadProvider } from './context/DisponibilidadContext.jsx'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <DisponibilidadProvider>
      <CartProvider>
        <App />
      </CartProvider>
    </DisponibilidadProvider>
  </StrictMode>,
)
