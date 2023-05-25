import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { voteAnecdote, initialAnecdotes } from '../reducers/anecdoteReducer';
import { setNotification } from '../reducers/notificationReducer';

export const AnecdoteList = () => {
  const dispatch = useDispatch();

  const anecdotes = useSelector((state) => {
    return state.anecdotes.filter((anecdote) =>
      anecdote.content.toLowerCase().includes(state.filter.toLowerCase())
    );
  });

  const vote = (id) => {
    console.log('vote', id);

    const anecdote = anecdotes.find((a) => a.id === id);

    dispatch(voteAnecdote(id));
    dispatch(setNotification(`you voted '${anecdote.content}'`, 3));
  };

  useEffect(() => {
    dispatch(initialAnecdotes());
  }, [dispatch]);

  return (
    <>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
    </>
  );
};

export default AnecdoteList;
