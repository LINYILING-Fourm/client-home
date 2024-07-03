// axios.js

import axios from 'axios';

// 创建 axios 实例
const instance = axios.create({
  baseURL: 'http://localhost:3000', // 后端 API 的基础 URL
  timeout: 10000, // 请求超时时间，单位毫秒
  headers: {
    'Content-Type': 'application/json', // 请求头类型
  },
});

// 请求拦截器
instance.interceptors.request.use(
  config => {
    // 在请求发送之前做些什么
    return config;
  },
  error => {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 响应拦截器
instance.interceptors.response.use(
  response => {
    // 对响应数据做些什么
    return response;
  },
  error => {
    // 对响应错误做些什么
    return Promise.reject(error);
  }
);

export default instance;
