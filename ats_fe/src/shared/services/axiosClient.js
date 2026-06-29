import axios from "axios";
import {v4 as uuidv4} from 'uuid';

const BASE_URL = "http://localhost:8080";

const axiosClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Send/receive the httpOnly accessToken cookie on every request
  timeout: 5000, // 5 seconds timeout
});

axiosClient.interceptors.request.use(
  function (config) {
    console.log("Calling", config.method, config.url);
    config.headers.set("X-Correlation-ID", uuidv4());
    return config; // you must return config so the call can proceed
  },
  function (error) {
    return Promise.reject(error);
  }
);

// Response interceptor: runs after every reply arrives
axiosClient.interceptors.response.use(
  function (response) {
    return response; // pass a good response straight through
  },
  function (error) {
    if (error.response && error.response.status === 401) {
      // The session is missing or expired, so send the user to the login page
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
