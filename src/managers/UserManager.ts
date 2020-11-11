import axios from 'axios';

export default {
  signUp(data: object) {
    return axios.post(process.env.REACT_APP_API_BASE_URL + 'api/signup', data);
  },
  signIn(data: object) {
    return axios.post(process.env.REACT_APP_API_BASE_URL + 'api/signin', data);
  },
};
