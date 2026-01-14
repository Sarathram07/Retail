import axiosInstance from "../axiosInstance";
import { ADMIN } from "../../constants/apiPaths";

export const getAdminProductsApi = () => {
  return axiosInstance.get(ADMIN.PRODUCTS.GET);
};
