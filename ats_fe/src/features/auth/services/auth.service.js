import axiosClient from "@/shared/services/axiosClient";

const authService = {
  login: (payload) => {
    return axiosClient.post("/api/v1/auths/login", payload);
  },
  register: (payload) => {
    return axiosClient.post("/api/v1/auths/register", payload);
  },
  // Restore session from the httpOnly cookie on app load
  me: () => {
    return axiosClient.get("/api/v1/auths/me");
  },
  logout: () => {
    return axiosClient.post("/api/v1/auths/logout");
  },
};

export default authService;
