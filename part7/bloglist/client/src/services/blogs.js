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

const remove = (id, token) => {
  const request = axios.delete(`${baseUrl}/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return request.then((response) => response.data);
};

const post = (blog, token) => {
  const request = axios.post(baseUrl, blog, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return request.then((response) => response.data);
};

const blogService = { getAll, update, remove, post };

export default blogService;
