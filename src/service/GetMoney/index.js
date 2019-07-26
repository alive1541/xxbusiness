import axios from "../axios.js";
import { baseApi } from "@/config/config.js";
class api {
  getAllWebsites(params) {
    return axios.get(baseApi + "/customer/get_all_websites", { params });
  }
  accountSubmit(params) {
    return axios.post(baseApi + "/customer/account_submit", params);
  }
}

export default new api();
