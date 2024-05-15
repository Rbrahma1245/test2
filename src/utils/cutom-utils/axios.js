import axios from 'axios';

// eslint-disable-next-line import/no-cycle
import { getSessionStorage } from 'src/hooks/use-local-storage';

import configFile from 'src/config.json';

import { decryptAESText, encryptAESText } from './const-function';

// ----------------------------------------------------------------------
let apiURL = ""
// eslint-disable-next-line prefer-template
apiURL = configFile.MODE === "LOCALHOST" ? `${configFile[configFile.MODE + "_URL"]}/` : `${configFile[configFile.MODE + "_URL"]}/api/`
const axiosInstance = axios.create({
  baseURL: apiURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const userInfo = getSessionStorage("loginUserInfo")
    if (userInfo !== null) {
      config.data.userId = userInfo.loginUserId;
    }
    const request = {
      body: config.data
    };
    config.data = {
      body: encryptAESText(JSON.stringify(request))
    };
    // }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => {
    response = JSON.parse(decryptAESText(response.data.body));
    return response;
  },
  (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong')
);

export default axiosInstance;

// ----------------------------------------------------------------------

export const fetcher = (args) =>
  new Promise((resolve, reject) => {
    // eslint-disable-next-line prefer-const
    let [url, config] = Array.isArray(args) ? args : [args];
    const userInfo = getSessionStorage("loginUserInfo");
    let payload = {}
    if (userInfo !== null) {
      // axiosInstance.defaults.headers.common['Authorization'] = 'Bearer ' + encryptAESText(userInfo.accessKey) + "/" + userInfo.loginToken;
      axiosInstance.defaults.headers.common.Authorization = `Bearer ${encryptAESText(userInfo.accessKey)}/${userInfo.loginToken}`;
      payload = {
        "accessUserID": userInfo.loginUserId,
        ...config.data
      };
    } else {
      payload = {
        ...config.data
      };
    }
    const request = {
      body: payload
    };
    url += `/${encryptAESText(JSON.stringify(request))}`;
    axiosInstance.get(url, { ...config })
      .then(response => {
        resolve(response);
      })
      .catch(error => {
        reject(error);
      });
  });

// ----------------------------------------------------------------------

export const postToServer = async (url, data) => {
  try {
    const userInfo = getSessionStorage("loginUserInfo")
    if (userInfo !== null) {
      // axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${encryptAESText(userInfo.accessKey)}/${userInfo.loginToken}`;
      axiosInstance.defaults.headers.common.Authorization = `Bearer ${encryptAESText(userInfo.accessKey)}/${userInfo.loginToken}`;
      data.accessUserID = userInfo.loginUserId;
    }
    const res = await axiosInstance.post(url, data);
    return res;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const post_resetPassword = async (url, request, data) => {
  try {
    const userInfo = getSessionStorage("loginUserInfo")
    const token = `ELIT${encryptAESText(JSON.stringify(data))}`
    axiosInstance.defaults.headers.common.Authorization = `Bearer ${encryptAESText(userInfo.accessKey)}/${token}`;
    const res = await axiosInstance.post(url, request);
    return res;
  } catch (error) {
    console.log(error);
    throw error;
  }
};