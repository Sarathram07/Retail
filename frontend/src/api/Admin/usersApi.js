import axiosInstance from "../axiosInstance";
import { ADMIN } from "../../constants/apiPaths";

export const getAdminUsersApi = () => {
  return axiosInstance.get(ADMIN.USERS.GET);
};

export const getAdminSingleUsersApi = (uid) => {
  return axiosInstance.get(ADMIN.USERS.GET_SINGLE + `/${uid}`);
};

export const updateAdminUserApi = (uid, data) => {
  return axiosInstance.put(ADMIN.USERS.UPDATE + `/${uid}`, data);
};

export const deleteAdminUserApi = (uid) => {
  return axiosInstance.delete(ADMIN.USERS.DELETE + `/${uid}`);
};
