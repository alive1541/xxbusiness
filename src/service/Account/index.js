import axios from "../axios.js";
import { baseApi } from "@/config/config.js";
class api {
  getAssets(params, token, language) {
    return axios.get(baseApi + "/customer/assets", {
      params,
      headers: {
        token,
        language
      }
    });
  }
  websiteBalance(params, token, language) {
    return axios.get(baseApi + "/customer/websiteBalance", {
      params,
      headers: {
        token,
        language
      }
    });
  }
  turnWebsiteStatus(params, token, language) {
    return axios.get(baseApi + "/customer/account/turn_website_status", {
      params,
      headers: {
        token,
        language
      }
    });
  }
}

export default new api();
