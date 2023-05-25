import { useMutation, useQueryClient } from 'react-query';

import { createAnecdote } from '../requests';

const AnecdoteForm = () => {
  const queryClient = useQueryClient();
  const createAnecdoteMutation = useMutation(createAnecdote);

  const onCreate = (event) => {
    event.preventDefault();

    const content = event.target.anecdote.value;
    createAnecdoteMutation.mutate(content, {
      onSuccess: (newAnecdote) => {
        const anecdotes = queryClient.getQueryData('anecdotes');
        queryClient.setQueryData('anecdotes', [...anecdotes, newAnecdote]);
      },
    });

    event.target.anecdote.value = '';
    console.log('new anecdote');
  };

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
