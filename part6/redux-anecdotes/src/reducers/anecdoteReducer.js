import { createSlice } from '@reduxjs/toolkit';
import anecdoteService from '../services/anecdotes';

const initialState = [];

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {
    vote: (state, action) => {
      const { id, votes } = action.payload;

      const anecdote = state.find((anecdote) => anecdote.id === id);
      anecdote.votes = votes;

      state.sort((a, b) => b.votes - a.votes);
    },

    add: (state, action) => {
      state.push(action.payload);
    },

    set: (state, action) => {
      const anecdotes = action.payload;
      anecdotes.sort((a, b) => b.votes - a.votes);
      return anecdotes;
    },
  },
});

const { add, vote, set } = anecdoteSlice.actions;

export const initialAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch(set(anecdotes));
  };
};

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const anecdote = await anecdoteService.create(content);
    dispatch(add(anecdote));
  };
};

export const voteAnecdote = (id) => {
  return async (dispatch) => {
    const anecdote = await anecdoteService.vote(id);
    dispatch(vote(anecdote));
  };
};

export default anecdoteSlice.reducer;
