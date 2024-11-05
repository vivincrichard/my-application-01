import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';


const queryClient = new QueryClient();
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <div
        style={{
          background: "linear-gradient(#9198e5, #9198e5)",
          height: "100vh",
        }}
      >
        <App />
      </div>
    </QueryClientProvider>
  </StrictMode>
);
