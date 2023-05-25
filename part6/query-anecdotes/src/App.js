import { useQuery, useMutation, useQueryClient } from 'react-query';
import AnecdoteForm from './components/AnecdoteForm';
import Notification from './components/Notification';
import { getAnecdotes, updateAnecdote } from './requests';
import { useNotification } from './contexts/NotificationContext';

const App = () => {
  const { setNotification } = useNotification();
  const updateAnecdoteMutation = useMutation(updateAnecdote);
  const queryClient = useQueryClient();

  const handleVote = (anecdote) => {
    const updatedAnecdote = { ...anecdote, votes: anecdote.votes + 1 };
    updateAnecdoteMutation.mutate(updatedAnecdote, {
      onSuccess: () => {
        const anecdotes = queryClient.getQueryData('anecdotes');
        const updatedAnecdotes = anecdotes.map((anecdote) =>
          anecdote.id === updatedAnecdote.id ? updatedAnecdote : anecdote
        );
        queryClient.setQueryData('anecdotes', updatedAnecdotes);
        setNotification(`anecdote '${updatedAnecdote.content}' voted`, 5);
      },
    });
    console.log('vote');
  };

  const anecdotesResult = useQuery('anecdotes', getAnecdotes);

  if (anecdotesResult.isLoading) {
    return <div>Loading...</div>;
  }

  if (anecdotesResult.isError) {
    return <div>anecdote service not available due to problems in server</div>;
  }

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotesResult.data.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;
