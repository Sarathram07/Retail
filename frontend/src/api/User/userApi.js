import axiosInstance from "../axiosInstance";
import { USER_API } from "../../constants/apiPaths";

export const loginUser = (data) => {
  return axiosInstance.post(USER_API.LOGIN, data);
};

export const logoutUser = () => {
  return axiosInstance.get(USER_API.LOGOUT);
};

export const registerUser = (data, config) => {
  return axiosInstance.post(USER_API.REGISTER, data, config);
};

export const getUserProfile = () => {
  return axiosInstance.get(USER_API.PROFILE.GET);
};

export const updateUserProfile = (data, config) => {
  return axiosInstance.put(USER_API.PROFILE.UPDATE, data, config);
};

export const updateUserPassword = (data) => {
  return axiosInstance.put(USER_API.PASSWORD.UPDATE, data);
};

export const forgotUserPassword = (data) => {
  return axiosInstance.post(USER_API.PASSWORD.FORGOT, data);
};

export const resetUserPassword = (data, token) => {
  return axiosInstance.post(`${USER_API.PASSWORD.RESET}/${token}`, data);
};
