import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './assets/main.css';
import App from './App.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <App/>
            {import.meta.env.MODE === 'development' &&
                <ReactQueryDevtools initialIsOpen={false}/>
            }
        </QueryClientProvider>
    </StrictMode>,
)
