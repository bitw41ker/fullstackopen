import axios from 'axios';

const baseURL = '/api/persons';

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

const update = (personData) => {
  const request = axios.put(`${baseURL}/${personData.id}`, personData);
  console.log(request.data);
  return request.then(response => response.data);
}

export default { getAll, create, remove, update };