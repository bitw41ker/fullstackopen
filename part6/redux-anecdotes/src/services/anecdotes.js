import axios from 'axios';

const baseUrl = 'http://localhost:3001/anecdotes';

const getAll = async () => {
  const res = await axios.get(baseUrl);
  return res.data;
};

const create = async (content) => {
  const res = await axios.post(baseUrl, { content, votes: 0 });
  return res.data;
};

const vote = async (id) => {
  const anecdotes = await getAll();
  let votes = anecdotes.find((a) => a.id === id).votes;
  votes++;
  const res = await axios.patch(`${baseUrl}/${id}`, { votes });
  return res.data;
};

const exportObj = { getAll, create, vote };

export default exportObj;
