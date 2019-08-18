import axios from "../axios.js";
import { baseApi } from "@/config/config.js";
class api {
  getWebsiteUrl(params, token, language) {
    return axios.get(baseApi + "/customer/website_url", {
      params,
      headers: {
        token,
        language
      }
    });
  }
  getInstruction(params, token, language) {
    return axios.get(baseApi + "/customer/instruction", {
      params,
      headers: {
        token,
        language
      }
    });
  }
}

export default new api();
