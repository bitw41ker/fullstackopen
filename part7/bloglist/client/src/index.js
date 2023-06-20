import React from 'react';
import ReactDOM from 'react-dom/client';
import RootIndex from './routes/RootIndex';
import { NotificationProvider } from './contexts/NotificationContext';
import { AuthProvider } from './contexts/AuthContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Root from './routes/Root';
import Users, { loader as usersLoader } from './routes/Users';
import User, { loader as userLoader } from './routes/User';
import Blog, {
  loader as blogLoader,
  action as blogAction,
} from './routes/Blog';
import Login from './routes/Login';

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
    children: [
      { index: true, element: <RootIndex /> },
      { path: 'users', element: <Users />, loader: usersLoader },
      { path: 'users/:userId', element: <User />, loader: userLoader },
      {
        path: 'blogs/:blogId',
        element: <Blog />,
        loader: blogLoader,
        action: blogAction,
      },
    ],
  },
  { path: '/login', element: <Login /> },
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
