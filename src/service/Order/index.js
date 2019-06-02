import axios from "../axios.js";
import { baseApi } from "@/config/config.js";
class api {
  getList(params) {
    return axios.get(baseApi + "/customer/order/list", { params });
  }
}

export default new api();
