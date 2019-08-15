import axios from "axios";
import ctx from "../main.js";

//跨域携带凭证信息
axios.defaults.withCredentials = true;
// 添加一个请求拦截器
axios.interceptors.request.use(
  function(config) {
    // Do something before request is sent
    return config;
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// 添加一个响应拦截器
axios.interceptors.response.use(
  function(response) {
    console.log(response);
    if (response.data.errorCode === 7) {
      return handle403Error("您在其他地方有登陆，请确认是否本人在登录");
    }
    return response.data;
  },
  function(error) {
    // const status = error.response.status;
    // // 统一拦截403
    // if (status === 403) {
    //   return handle403Error("您在其他地方有登陆，请确认是否本人在登录");
    // }
    // return Promise.reject(error);
  }
);

function handle403Error(msg) {
  ctx.$vux.alert.show({
    title: "请重新登录",
    content: msg,
    onShow() {
      // console.log("Plugin: I'm showing");
    },
    onHide() {
      window.location.href = "/";
      // ctx.$router.replace({ name: "LogIn" });
    }
  });
}

export default axios;
