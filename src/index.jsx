import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter} from "react-router-dom"

import App from './App.jsx'
import { DataProvider } from './contexts/DataContext.jsx'
import { ModalProvider } from './contexts/ModalContext.jsx'

createRoot(document.getElementById('root')).render(
    // <StrictMode>
    <BrowserRouter>
      <DataProvider>
        <ModalProvider>
            <App />
        </ModalProvider>
      </DataProvider>
    </BrowserRouter>
    // </StrictMode>,
)
