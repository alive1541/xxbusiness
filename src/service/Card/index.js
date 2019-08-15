import axios from "../axios.js";
import { baseApi } from "@/config/config.js";
class api {
  getOnlineStatus(params, token) {
    return axios.get(baseApi + "/customer/show_owner_info", {
      params,
      headers: {
        token
      }
    });
  }
  setOnlineStatus(params) {
    return axios.get(baseApi + "/customer/auto_online", {
      params,
      headers: {
        token
      }
    });
  }
}

export default new api();
