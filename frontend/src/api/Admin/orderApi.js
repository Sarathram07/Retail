import axiosInstance from "../axiosInstance";
import { ADMIN } from "../../constants/apiPaths";

export const getAdminAllOrdersApi = () => {
  return axiosInstance.get(ADMIN.ORDER.GET_ALL);
};

export const deleteAdminOrderApi = (id) => {
  return axiosInstance.delete(ADMIN.ORDER.DELETE + `/${id}`);
};

export const updateAdminOrderApi = (id, data) => {
  return axiosInstance.put(ADMIN.ORDER.UPDATE + `/${id}`, data);
};
