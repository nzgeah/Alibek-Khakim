import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource-variable/pixelify-sans'
import '@fontsource-variable/handjet'
import './index.css'
import App from './App.tsx'
import { appReady, hideLoader } from './lib/ready'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

appReady.then(hideLoader)
