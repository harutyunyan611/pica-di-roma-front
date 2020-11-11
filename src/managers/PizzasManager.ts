import axios from 'axios';

export default {
  getPizzas() {
    return axios.get(process.env.REACT_APP_API_BASE_URL + 'api/pizzas');
  },
};
