import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from "./app.tsx";
import 'tailwindcss/index.css'
import '@xyflow/react/dist/style.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
