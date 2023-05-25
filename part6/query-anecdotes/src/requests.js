import axios from 'axios';

const baseUrl = 'http://localhost:3001/anecdotes';

export const getAnecdotes = async () => {
  const res = await axios.get(baseUrl);
  return res.data;
};

export const createAnecdote = async (content) => {
  const anecdote = { content, votes: 0 };
  const res = await axios.post(baseUrl, anecdote);
  return res.data;
};

export const updateAnecdote = async (anecdote) => {
  const res = await axios.put(`${baseUrl}/${anecdote.id}`, anecdote);
  return res.data;
};
