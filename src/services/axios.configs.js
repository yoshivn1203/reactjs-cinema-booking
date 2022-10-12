import axios from "axios";
import { TOKEN_CYBERSOFT, USER_INFO_KEY } from "../constants/common";

export const request = axios.create({
  baseURL: "https://movienew.cybersoft.edu.vn/api/",
  headers: {
    TokenCybersoft: TOKEN_CYBERSOFT,
  },
});

//REQUEST: A  => interceptors => B

request.interceptors.request.use((config) => {
  let userInfo = localStorage.getItem(USER_INFO_KEY);
  
  if (userInfo) {
      userInfo = JSON.parse(userInfo);
      
      // Bearer: tiêu chuẩn json web token
      config.headers.Authorization = `Bearer ${userInfo.accessToken}`;
  }

  return config;
})

//RESPONSE: A => interceptors => B
request.interceptors.response.use((respone) => {
  // console.log(respone);
  return respone;
})