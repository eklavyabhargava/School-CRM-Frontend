import axios from "axios";

const api = axios.create({
  baseURL: `${process.env.REACT_APP_API_BASE_URL}/api`,
  withCredentials: true,
});

// Response Interceptor: Handle Errors Globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error.response?.data?.message || error.message);

    if (error.response) {
      // Handle different status codes
      switch (error.response.status) {
        case 400:
          break;
        case 401:
          alert("Unauthorized: Please log in again.");
          if (!window.location.pathname.includes("/login")) {
            const basePath = window.location.pathname.includes("/admin")
              ? "admin"
              : window.location.pathname.includes("teacher")
              ? "teacher"
              : "student";
            window.location.href = `/${basePath}/login`;
          }
          break;
        case 403:
          break;
        case 404:
          break;
        case 500:
          break;
        default:
          alert("An unexpected error occurred.");
      }
    } else {
      alert("Network Error. Please check your connection.");
    }

    return Promise.reject(error);
  }
);

export default api;
