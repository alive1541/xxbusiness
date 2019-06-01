import axios from 'axios';
import ctx from '../main.js';

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
    // 统一拦截403
    if (response.data.errorCode !== 0 && response.data.msg === '请求非法') {
      return handle403Error('请求非法');
    }
    return response.data;
  },
  function(error) {
    return Promise.reject(error);
  }
);

function handle403Error(msg) {
  ctx.$vux.alert.show({
    title: '请求失败',
    content: msg,
    onShow() {
      // console.log("Plugin: I'm showing");
    },
    onHide() {
      ctx.$router.replace({ name: 'LogIn' });
    }
  });
}

export default axios;
