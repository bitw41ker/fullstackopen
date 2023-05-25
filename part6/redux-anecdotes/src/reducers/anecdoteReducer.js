import { createSlice } from '@reduxjs/toolkit';
import anecdoteService from '../services/anecdotes';

const initialState = [];

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
      state.push(action.payload);
    },

    setAnecdotes: (state, action) => {
      return action.payload;
    },
  },
});

export const { voteAnecdote, addAnecdote, setAnecdotes } =
  anecdoteSlice.actions;

export const initialAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch(setAnecdotes(anecdotes));
  };
};

export default anecdoteSlice.reducer;
