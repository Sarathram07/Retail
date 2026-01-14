import axiosInstance from "../axiosInstance";
import { PRODUCT_API } from "../../constants/apiPaths";

export const buildQuery = (args) => {
  const query = new URLSearchParams();

  Object.entries(args).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      if (Array.isArray(value)) {
        query.append(`${key}[gte]`, value[0]);
        query.append(`${key}[lte]`, value[1]);
      } else {
        query.append(key, value);
      }
    }
  });

  return query.toString();
};

export const getProductsApi = (params = {}) => {
  const query = buildQuery(params);
  return axiosInstance.get(`${PRODUCT_API.GET_PRODUCTS}?${query}`);
};
