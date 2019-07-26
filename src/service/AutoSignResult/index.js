import axios from "../axios.js";
import { baseApi } from "@/config/config.js";
class api {
  registerInfoList(params) {
    return axios.get(baseApi + "/customer/register_info_list", {
      params
    });
  }
}

export default new api();
