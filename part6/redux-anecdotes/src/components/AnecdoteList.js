import { useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { voteAnecdote, initialAnecdotes } from '../reducers/anecdoteReducer';
import {
  setNotification,
  clearNotification,
} from '../reducers/notificationReducer';

export const AnecdoteList = () => {
  let ref = useRef(null);

  const dispatch = useDispatch();

  const anecdotes = useSelector((state) => {
    return state.anecdotes.filter((anecdote) =>
      anecdote.content.toLowerCase().includes(state.filter.toLowerCase())
    );
  });

  const vote = (id) => {
    console.log('vote', id);

    dispatch(voteAnecdote(id));
    dispatch(
      setNotification(
        `you voted '${anecdotes.find((a) => a.id === id).content}'`
      )
    );

    if (ref.current) {
      clearTimeout(ref.current);
    }

    ref.current = setTimeout(() => {
      dispatch(clearNotification());
    }, 5000);
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
