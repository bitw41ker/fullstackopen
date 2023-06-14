import { useLoaderData } from 'react-router-dom';
import { getAnecdote } from './Anecdotes';

export function loader({ params }) {
  return getAnecdote(params.anecdoteId);
}

const Anecdote = () => {
  const anecdote = useLoaderData();
  return (
    <div>
      <h2>{anecdote.content}</h2>
      <div>has {anecdote.votes} votes</div>
      <div>
        for more info see <a href={anecdote.info}>{anecdote.info}</a>
      </div>
      <br />
    </div>
  );
};

export default Anecdote;
