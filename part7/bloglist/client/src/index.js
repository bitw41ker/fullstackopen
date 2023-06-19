import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { NotificationProvider } from './contexts/NotificationContext';
import { AuthProvider } from './contexts/AuthContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Root from './routes/Root';

const queryOptions = {
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [{ index: true, element: <App /> }],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={new QueryClient(queryOptions)}>
    <AuthProvider>
      <NotificationProvider>
        <RouterProvider router={router} />
      </NotificationProvider>
    </AuthProvider>
  </QueryClientProvider>
);
