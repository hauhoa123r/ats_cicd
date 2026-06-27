import axiosClient from "@/shared/services/axiosClient";

const authService = {
  login: async (payload) => {
    console.log("Login payload:", payload);
    const response = axiosClient.post("/api/v1/auths/login", payload);
    return response;

    // Implementation for login
  },
  register: async (payload) => {
    // Implementation for registration
  },
  logout: async () => {
    // Implementation for logout
  },
};

export default authService;
