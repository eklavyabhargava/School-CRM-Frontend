import api from "./api";

// check user authentication
export const checkAuth = () => api.get("/check-auth");

// logout user
export const logout = () => api.get("/logout");
