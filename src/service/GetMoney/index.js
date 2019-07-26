import axios from "../axios.js";
import { baseApi } from "@/config/config.js";
import qs from "qs";

class api {
  getAllWebsites(params) {
    return axios.get(baseApi + "/customer/get_all_websites", { params });
  }
  accountSubmit(params, token) {
    token = qs.stringify(token);
    return axios.post(baseApi + "/customer/account_submit?" + token, params);
  }
}

export default new api();
