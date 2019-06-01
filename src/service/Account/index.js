import axios from "../axios.js";
import { baseApi } from "@/config/config.js";
class api {
  userBalance(params) {
    return axios.get(baseApi + "/customer/allBalance", { params });
  }
  websiteBalance(params) {
    return axios.get(baseApi + "/customer/websiteBalance", { params });
  }
}

export default new api();
