import axios from "axios";
import { Toast } from "antd-mobile";
import { getTokenInfo } from "./storage";
const instance = axios.create({
  timeout: 5000,
  baseURL: "http://geek.itheima.net/v1_0/",
});
//配置拦截器
instance.interceptors.request.use(
  (config) => {
    //对config做点什么
    //获取token
    const token = getTokenInfo().token;
    if (token) {
      config.headers.Authorization = "Bearer " + token;
    }
    return config;
  },
  (error) => {
    //对错误做点儿什么
    return Promise.reject(error);
  }
);
//配置响应拦截器
instance.interceptors.response.use(
  (response) => {
    //对响应做点儿什么
    return response.data;
  },
  (err) => {
    if (err.response) {
      Toast.show({
        content: err.response.data.message,
        duration: 1000,
      });
    } else {
      Toast.show({
        content: "网络繁忙，请稍后重试",
        duration: 1000,
      });
    }
    return Promise.reject(err);
  }
);
export default instance;
