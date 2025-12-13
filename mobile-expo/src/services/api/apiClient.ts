import axios from "axios";
import { Platform } from "react-native";
import { CONSTANTS } from "../../constants";

const getBaseUrl = () => {
  const envUrl = process.env.NEST_BASE_URL || CONSTANTS.DEFAULT_URL;

  if (Platform.OS === "android" && envUrl.includes("localhost")) {
    return envUrl.replace("localhost", "10.0.2.2");
  }

  return envUrl;
};

export const BASE_URL = getBaseUrl();

export const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      console.error('API Error:', error.response.data);
    } else if (error.request) {
      console.error('Network Error:', error.request);
    } else {
      console.error('Error:', error.message);
    }
    return Promise.reject(error);
  }
);
