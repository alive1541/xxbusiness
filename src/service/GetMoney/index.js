import axios from "../axios.js";
import { baseApi } from "@/config/config.js";

class api {
  getAllWebsites(params, token, language) {
    return axios.get(baseApi + "/customer/get_all_websites", {
      params,
      headers: {
        token,
        language
      }
    });
  }
  accountSubmit(params, token, language) {
    // token = qs.stringify(token);
    return axios.post(baseApi + "/customer/account_submit", params, {
      headers: {
        token,
        language
      }
    });
  }
}

export default new api();
