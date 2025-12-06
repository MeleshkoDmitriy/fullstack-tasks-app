import axios from "axios";
import { Platform } from "react-native";

const getBaseUrl = () => {
  // Android emulator uses a special IP
  if (Platform.OS === "android") {
    return "http://10.0.2.2:4200/api/v1";
  }

  // iOS simulator should work with localhost
  if (Platform.OS === "ios") {
    return "http://localhost:4200/api/v1";
  }

  // For web (if you run through expo web)
  return "http://localhost:4200/api/v1";
};

export const BASE_URL = getBaseUrl();

export const apiConfig = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// apiConfig.interceptors.request.use(
//   (config) => {
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// apiConfig.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response) {
//       console.error('API Error:', error.response.data);
//     } else if (error.request) {
//       console.error('Network Error:', error.request);
//     } else {
//       console.error('Error:', error.message);
//     }
//     return Promise.reject(error);
//   }
// );
