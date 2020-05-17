/*
 * @Description:
 * @version: 1.0
 * @Author: Leo
 * @Date: 2020-05-10 19:36:45
 * @LastEditors: Leo
 * @LastEditTime: 2020-05-17 18:44:46
 */
const config = {
  production: {
    baseUrl: "https://api.leobob.cn/gallery",
    staticUrl: "http://www.leobob.cn/gallery",
    removeUrl: "https://api.leobob.cn/gallery/remove"
  },
  development: {
    baseUrl: "http://localhost:4001/gallery",
    staticUrl: "http://localhost:4001/gallery/gallery",
    removeUrl: "http://localhost:4001/gallery/remove"
  },
};

const exportConfig = config[process.env.NODE_ENV];

export default exportConfig;
