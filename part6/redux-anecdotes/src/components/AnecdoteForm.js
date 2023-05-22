import { useDispatch } from 'react-redux';
import { addAnecdote } from '../reducers/anecdoteReducer';

export const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const add = (e) => {
    e.preventDefault();
    const anecdote = e.target.anecdote.value;
    e.target.anecdote.value = '';
    dispatch(addAnecdote(anecdote));
  };

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={add}>
        <div>
          <input name="anecdote" />
        </div>
        <button>create</button>
      </form>
    </>
  );
};

export default AnecdoteForm;
