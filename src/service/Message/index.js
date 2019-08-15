import axios from "../axios.js";
import { baseApi } from "@/config/config.js";
class api {
  getOrderList(params, token) {
    return axios.get(baseApi + "/customer/notice_msg/list", {
      params,
      headers: {
        token
      }
    });
  }
}

export default new api();
