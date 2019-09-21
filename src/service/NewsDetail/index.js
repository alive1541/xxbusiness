import axios from "../axios.js";
import { newsApi } from "@/config/config.js";
class api {
  getNewsDetail(params, token) {
    const headers = {};
    if (token) {
      headers.token = token;
    }
    return axios.get(newsApi + "/news/get_news_detail", {
      params,
      headers
    });
  }
}

export default new api();
