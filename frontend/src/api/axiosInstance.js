import axios from "axios";
import { API_BASE_URL } from "../constants/apiPaths";

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    common: {
      Accept: "application/json",
    },
    post: { "Content-Type": "application/json" },
    put: { "Content-Type": "application/json" },
  },
});

export default axiosInstance;

// axiosInstance.defaults.headers.post["Content-Type"] = "application/json";

//--------------------------------------------------------------------------------------------------------------------

// axiosInstance.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("token");

//     // Set Authorization if token exists
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }

//  Ensure Content-Type is always JSON
//     config.headers["Content-Type"] = "application/json";

//     // Only set Content-Type for POST requests
//     if (config.method && config.method.toLowerCase() === "post") {
//       config.headers["Content-Type"] = "application/json";
//     }

//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

//--------------------------------------------------------------------------------------------------------------------

// axiosInstance.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token");
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });
