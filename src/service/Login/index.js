import axios from '../axios.js';
import { baseApi } from '@/config/config.js';
class api {
  login(params) {
    return axios.get(baseApi + '/login', { params });
  }
}

export default new api();
