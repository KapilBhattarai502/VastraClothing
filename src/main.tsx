import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { QueryClient, QueryClientProvider } from 'react-query'
import { store } from './store/Store.ts'
import { Provider } from 'react-redux'

const queryClient=new QueryClient()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
    <QueryClientProvider client={queryClient}>
    <App />
    </QueryClientProvider>
    </Provider>
   </StrictMode> 
)
