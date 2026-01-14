import axiosInstance from "../axiosInstance";
import { ORDER_API } from "../../constants/apiPaths";

export const createOrderApi = (orderDetails) => {
  return axiosInstance.post(ORDER_API.CREATE, orderDetails);
};

export const getUserOrders = () => {
  return axiosInstance.get(ORDER_API.GET);
};

export const showOrderDetail = (id) => {
  return axiosInstance.get(`${ORDER_API.SHOW}/${id}`);
};
