import axiosInstance from "../axiosInstance";
import { ADMIN } from "../../constants/apiPaths";

export const createNewAdminProductsApi = (data) => {
  return axiosInstance.post(ADMIN.PRODUCT.CREATE_NEW, data);
};

export const deleteAdminProductApi = (pid) => {
  return axiosInstance.delete(ADMIN.PRODUCT.DELETE + `/${pid}`);
};

export const updateAdminProductApi = (pid, data) => {
  return axiosInstance.put(ADMIN.PRODUCT.UPDATE + `/${pid}`, data);
};
