import axios from "../axios.js";
import { baseApi } from "@/config/config.js";
class api {
  getList(params, token, language) {
    return axios.get(baseApi + "/customer/order/list", {
      params,
      headers: {
        token,
        language
      }
    });
  }
  getHistory(params, token, language) {
    return axios.get(baseApi + "/customer/order/history_list", {
      params,
      headers: {
        token,
        language
      }
    });
  }
}

export default new api();
