import axios from "../axios.js";
import { baseApi } from "@/config/config.js";
class api {
  getWebsiteUrl(params, token) {
    return axios.get(baseApi + "/customer/website_url", {
      params,
      headers: {
        token
      }
    });
  }
  getInstruction(params, token) {
    return axios.get(baseApi + "/customer/instruction", {
      params,
      headers: {
        token
      }
    });
  }
}

export default new api();
