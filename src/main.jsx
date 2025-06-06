// main.jsx - Entry point for Buren voor Buren React app
// Mounts the App component to the DOM and applies global styles.
//
// Author: KobeBerckmans
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.css'
import './styles/global.css'
import App from './components/App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
