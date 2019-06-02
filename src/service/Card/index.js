import axios from "../axios.js";
import { baseApi } from "@/config/config.js";
class api {
  getOnlineStatus(params) {
    return axios.get(baseApi + "/customer/show_owner_info", { params });
  }
  setOnlineStatus(params) {
    return axios.get(baseApi + "/customer/auto_online", { params });
  }
}

export default new api();
