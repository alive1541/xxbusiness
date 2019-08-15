import axios from "../axios.js";
import { baseApi } from "@/config/config.js";
class api {
  getList(params, token) {
    return axios.get(baseApi + "/customer/order/list", {
      params,
      headers: {
        token
      }
    });
  }
  getHistory(params, token) {
    return axios.get(baseApi + "/customer/order/history_list", {
      params,
      headers: {
        token
      }
    });
  }
}

export default new api();
