import axios from "../axios.js";
import { baseApi } from "@/config/config.js";
class api {
  getOrderList(params) {
    return axios.get(baseApi + "/customer/notice_msg/list", { params });
  }
}

export default new api();
