import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from 'react-query';
import { NotificationProvider } from './contexts/NotificationContext';

import App from './App';

ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={new QueryClient()}>
    <NotificationProvider>
      <App />
    </NotificationProvider>
  </QueryClientProvider>
);
