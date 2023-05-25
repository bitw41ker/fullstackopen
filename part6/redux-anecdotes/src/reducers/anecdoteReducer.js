import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

const getId = () => (100000 * Math.random()).toFixed(0);

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {
    voteAnecdote: (state, action) => {
      const id = action.payload;

      const anecdote = state.find((anecdote) => anecdote.id === id);
      anecdote.votes++;

      state.sort((a, b) => b.votes - a.votes);
    },

    addAnecdote: (state, action) => {
      state.push({ content: action.payload, id: getId(), votes: 0 });
    },

    setAnecdotes: (state, action) => {
      return action.payload;
    },
  },
});

export const { voteAnecdote, addAnecdote, setAnecdotes } =
  anecdoteSlice.actions;
export default anecdoteSlice.reducer;
