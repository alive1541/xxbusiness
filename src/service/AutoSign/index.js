import axios from "../axios.js";
import qs from "qs";
import { baseApi } from "@/config/config.js";
class api {
  registerFilledInfoRange(params, token, language) {
    return axios.get(baseApi + "/customer/register_filled_info_range", {
      params,
      headers: {
        token,
        language
      }
    });
  }
  registerWebsites(params, token, language) {
    // token = qs.stringify(token);
    return axios.post(baseApi + "/customer/register_websites", params, {
      headers: {
        token,
        language
      }
    });
  }
}

export default new api();
