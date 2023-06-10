import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Menu from './Menu';
import Footer from './Footer';

const Root = () => {
  const [notification, setNotification] = useState('');

  // const addNew = (anecdote) => {
  //   anecdote.id = Math.round(Math.random() * 10000);
  //   setAnecdotes(anecdotes.concat(anecdote));
  // };

  // const anecdoteById = (id) => anecdotes.find((a) => a.id === id);

  // const vote = (id) => {
  //   const anecdote = anecdoteById(id);

  //   const voted = {
  //     ...anecdote,
  //     votes: anecdote.votes + 1,
  //   };

  //   setAnecdotes(anecdotes.map((a) => (a.id === id ? voted : a)));
  // };

  return (
    <div>
      <h1>Software anecdotes</h1>
      <Menu />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Root;
