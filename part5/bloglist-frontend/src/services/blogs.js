import axios from 'axios';
const baseUrl = '/api/blogs';

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const update = (id, blog) => {
  const request = axios.patch(`${baseUrl}/${id}`, blog);
  return request.then((response) => response.data);
};

export default { getAll, update };
