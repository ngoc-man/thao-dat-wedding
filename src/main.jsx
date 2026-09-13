import { MotionConfig } from 'motion/react'
import { createRoot } from 'react-dom/client'
import App from './app'
import './styles.css'

createRoot(document.getElementById('root')).render(
  <MotionConfig reducedMotion="user">
    <App />
  </MotionConfig>,
)
