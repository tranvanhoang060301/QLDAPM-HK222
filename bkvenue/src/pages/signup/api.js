import axios from 'axios';

export const callapi = (data) => {
  return axios.post('http://localhost:5000/user/register', data)
    .then(response => response.data);
};
