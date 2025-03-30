import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { MapProvider } from 'react-map-gl/maplibre';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from '@/components/ui/theme-provider';
import { Toaster } from '@/components/ui/sonner';
import App from './App.tsx';

import './index.css';
import 'maplibre-gl/dist/maplibre-gl.css';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <MapProvider>
          <App />
          <Toaster />
          <ReactQueryDevtools />
        </MapProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </StrictMode>
);
