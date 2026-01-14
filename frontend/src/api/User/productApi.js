import axiosInstance from "../axiosInstance";
import { PRODUCT_API, REVIEW_API } from "../../constants/apiPaths";

export const getProductById = (prodId) => {
  return axiosInstance.get(`${PRODUCT_API.GET_PRODUCT}/${prodId}`);
};

export const createReviewApi = (reviewData) => {
  return axiosInstance.put(REVIEW_API.CREATE, reviewData);
};
