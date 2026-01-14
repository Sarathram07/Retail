import axiosInstance from "../axiosInstance";
import { ADMIN } from "../../constants/apiPaths";

export const getAdminReviewsApi = (config) => {
  return axiosInstance.get(ADMIN.REVIEWS.GET, config);
};

export const deleteAdminReviewApi = (config) => {
  return axiosInstance.delete(ADMIN.REVIEWS.DELETE, config);
};
