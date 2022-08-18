import axios from 'axios';

const baseURL = 'http://localhost:3001/persons';

const getAll = () => {
  const request = axios.get(baseURL);
  return request.then(response => response.data);
}

const create = (personData) => {
  const request = axios.post(baseURL, personData);
  return request.then(response => response.data);
}

const remove = (personId) => {
  const request = axios.delete(`${baseURL}/${personId}`, personId);
  return request.then(response => response.data);
}

export default { getAll, create, remove };