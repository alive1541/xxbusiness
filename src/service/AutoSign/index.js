import axios from "../axios.js";
import qs from "qs";
import { baseApi } from "@/config/config.js";
class api {
  registerFilledInfoRange(params) {
    return axios.get(baseApi + "/customer/register_filled_info_range", {
      params
    });
  }
  registerWebsites(params, token) {
    token = qs.stringify(token);
    return axios.post(baseApi + "/customer/register_websites?" + token, params);
  }
}

export default new api();
