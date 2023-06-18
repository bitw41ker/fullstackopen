import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { NotificationProvider } from './contexts/NotificationContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryOptions = {
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={new QueryClient(queryOptions)}>
    <NotificationProvider>
      <App />
    </NotificationProvider>
  </QueryClientProvider>
);
