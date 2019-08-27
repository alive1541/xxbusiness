import axios from "../axios.js";
import { baseApi } from "@/config/config.js";
class api {
  submitAccountInfoList(params, token, language) {
    return axios.get(baseApi + "/customer/submit_account_info_list", {
      params,
      headers: {
        token,
        language
      }
    });
  }
}

export default new api();
