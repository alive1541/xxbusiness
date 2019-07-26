import axios from "../axios.js";
import { baseApi } from "@/config/config.js";
class api {
  registerFilledInfoRange(params) {
    return axios.get(baseApi + "/customer/register_filled_info_range", {
      params
    });
  }
  registerWebsites(params) {
    return axios.post(baseApi + "/customer/register_websites", params);
  }
}

export default new api();
