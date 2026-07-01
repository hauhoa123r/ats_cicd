import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import authService from "@/features/auth/services/auth.service";

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
  },
);

// Response interceptor: runs after every reply arrives
axiosClient.interceptors.response.use(
  function (response) {
    return response; // pass a good response straight through
  },
  async function (error) {
    const originalConfig = error.config;

    if (error.response) {
      console.log("Error response:", error.response.status, originalConfig.url);
    }

    // originalConfig.url !== "/api/v1/auths/refresh"
    if (
      error.response &&
      error.response.status === 401 &&
      !originalConfig._retry
    ) {
      originalConfig._retry = true; // Đánh dấu đã retry

      try {
        console.log("Session expired. Attempting to refresh token...");

        const response = await authService.refreshToken();
        const userProfile = response.data;

        // Cập nhật lại thông tin user cache nếu backend có trả về profile
        if (userProfile) {
          localStorage.setItem("user", JSON.stringify(userProfile));
        }

        // Thực hiện lại request ban đầu với session (cookie) mới
        return axiosClient(originalConfig);
      } catch (_error) {
        console.error("Refresh token failed, logging out...", _error);
        // Nếu refresh token cũng hết hạn hoặc lỗi -> Xoá session và đẩy về login
        localStorage.removeItem("user");

        if (window.location.pathname !== "/login") {
          window.location.href = "/login";
        }

        return Promise.reject(_error);
      }
    }

    return Promise.reject(error);
  },
);

export default axiosClient;
