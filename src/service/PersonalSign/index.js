import axios from "../axios.js";
import { baseApi } from "@/config/config.js";
class api {
  getWebsiteUrl(params) {
    return axios.get(baseApi + "/customer/website_url", { params });
  }
  getInstruction(params) {
    return axios.get(baseApi + "/customer/instruction", { params });
  }
}

export default new api();
