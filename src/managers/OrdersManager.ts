import axios from 'axios';
import AxiosDefaultConfig from "./config/AxiosDefaultConfig";

export default {
  getOrders() {
    return axios.get(process.env.REACT_APP_API_BASE_URL + 'api/orders', AxiosDefaultConfig.getBaseConfig());
  },
  addOrder(data: object, headers: object) {
    return axios.post(process.env.REACT_APP_API_BASE_URL + 'api/order', data, headers);
  }
};
