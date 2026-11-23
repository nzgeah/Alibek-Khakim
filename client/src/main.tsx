import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource-variable/pixelify-sans'
import '@fontsource/press-start-2p'
import '@fontsource/tiny5'
import './index.css'
import App from './App.tsx'
import { appReady, showStart } from './lib/ready'
import { initSounds, playReadyChime } from './lib/sound'

// Browsers put a reloaded page back where it was scrolled. With the loading
// screen and typing intro that lands the visitor mid-page, so always start
// at the top instead (ScrollManager in App.tsx handles #section links).
window.history.scrollRestoration = 'manual'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

appReady.then(() => showStart(() => void playReadyChime()))
initSounds()
