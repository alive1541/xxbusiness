import axios from "../axios.js";
import { baseApi } from "@/config/config.js";
class api {
  registerInfoList(params, token, language) {
    return axios.get(baseApi + "/customer/register_info_list", {
      params,
      headers: {
        token,
        language
      }
    });
  }
}

export default new api();
