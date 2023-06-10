import React from 'react';
import ReactDOM from 'react-dom/client';
import Root from './routes/Root';
import AnecdoteList, {
  loader as anecdoteLoader,
} from './components/AnecdoteList';
import About from './components/About';
import CreateNew from './components/CreateNew';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        index: true,
        element: <AnecdoteList />,
        loader: anecdoteLoader,
      },
      { path: 'create', element: <CreateNew addNew={() => null} /> },
      { path: 'about', element: <About /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);
