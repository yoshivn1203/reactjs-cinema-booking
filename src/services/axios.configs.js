import axios from 'axios';
import { TOKEN_CYBERSOFT } from '../utils/common';

export const request = axios.create({
  baseURL: 'https://movienew.cybersoft.edu.vn/api/',
  headers: {
    TokenCybersoft: TOKEN_CYBERSOFT,
  },
});

request.interceptors.request.use((config) => {
  let userInfo = localStorage.getItem('USER_CINEMA');

  if (userInfo) {
    userInfo = JSON.parse(userInfo);

    config.headers.Authorization = `Bearer ${userInfo.accessToken}`;
  }

  return config;
});

request.interceptors.response.use((respone) => {
  // console.log(respone);
  return respone;
});
