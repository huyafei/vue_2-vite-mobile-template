/**
 * @name: index
 * @description：index.js
 * @date: 2022/10/20 9:53
 * @author: yf_hu
 */

import axios from "@plugins/modules/axios";

export function userLogin(data) {
  return axios({
    url: `/user/userLogin`,
    method: "post",
    data,
  });
}

export function getUserInfo() {
  return axios({
    url: `/user/getUserInfo`,
    method: "get",
  });
}
