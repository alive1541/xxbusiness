import axios from "../axios.js";
import { baseApi } from "@/config/config.js";
class api {
  getAssets(params, token) {
    return axios.get(baseApi + "/customer/assets", {
      params,
      headers: {
        token
      }
    });
  }
  websiteBalance(params, token) {
    return axios.get(baseApi + "/customer/websiteBalance", {
      params,
      headers: {
        token
      }
    });
  }
  turnWebsiteStatus(params, token) {
    return axios.get(baseApi + "/customer/account/turn_website_status", {
      params,
      headers: {
        token
      }
    });
  }
}

export default new api();
