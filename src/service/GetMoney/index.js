import axios from "../axios.js";
import { baseApi } from "@/config/config.js";
import qs from "qs";

class api {
  getAllWebsites(params, token) {
    return axios.get(baseApi + "/customer/get_all_websites", {
      params,
      headers: {
        token
      }
    });
  }
  accountSubmit(params, token) {
    // token = qs.stringify(token);
    return axios.post(baseApi + "/customer/account_submit", params, {
      headers: {
        token
      }
    });
  }
}

export default new api();
