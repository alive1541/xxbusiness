import axios from "../axios.js";
import { baseApi } from "@/config/config.js";
class api {
  getAssets(params) {
    return axios.get(baseApi + "/customer/assets", { params });
  }
  websiteBalance(params) {
    return axios.get(baseApi + "/customer/websiteBalance", { params });
  }
  turnWebsiteStatus(params) {
    return axios.get(baseApi + "/customer/account/turn_website_status", {
      params
    });
  }
}

export default new api();
