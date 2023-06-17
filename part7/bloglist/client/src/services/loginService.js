import axios from 'axios';
const baseUrl = '/api/login';

async function login(credentials) {
  const res = await axios.post(baseUrl, credentials);
  return res.data;
}

const loginService = { login };

export default loginService;
