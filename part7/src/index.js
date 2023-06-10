import React from 'react';
import ReactDOM from 'react-dom/client';
import Root from './routes/Root';
import Anecdotes, { loader as anecdotesLoader } from './routes/Anecdotes';
import Anecdote, { loader as anecdoteLoader } from './routes/Anecdote';
import About from './routes/About';
import CreateNew from './routes/CreateNew';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        index: true,
        element: <Anecdotes />,
        loader: anecdotesLoader,
      },
      {
        path: 'anecdotes/:anecdoteId',
        element: <Anecdote />,
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
