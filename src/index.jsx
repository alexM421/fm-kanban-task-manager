import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter} from "react-router-dom"

import App from './App.jsx'
import { DataProvider } from './contexts/DataContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <DataProvider>
        <App />
      </DataProvider>
    </BrowserRouter>
  </StrictMode>,
)
