import axios from "../axios.js";
import { baseApi } from "@/config/config.js";
class api {
  getOnlineStatus(params, token, language) {
    return axios.get(baseApi + "/customer/show_owner_info", {
      params,
      headers: {
        token,
        language
      }
    });
  }
  setOnlineStatus(params, token, language) {
    return axios.get(baseApi + "/customer/auto_online", {
      params,
      headers: {
        token,
        language
      }
    });
  }
}

export default new api();
