import axios from "../axios.js";
import { baseApi } from "@/config/config.js";
class api {
  getOrderList(params, token, language) {
    return axios.get(baseApi + "/customer/notice_msg/list", {
      params,
      headers: {
        token,
        language
      }
    });
  }
}

export default new api();
