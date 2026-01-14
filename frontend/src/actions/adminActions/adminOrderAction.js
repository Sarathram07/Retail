import axios from "axios";

import {
  adminOrdersRequest,
  adminOrderSuccess,
  adminOrderFail,
  deleteOrdersRequest,
  deleteOrderSuccess,
  deleteOrderFail,
  updateOrderRequest,
  updateOrderSuccess,
  updateOrderFail,
} from "../../reducer/admin/orderSlice";

import {
  getAdminAllOrdersApi,
  deleteAdminOrderApi,
  updateAdminOrderApi,
} from "../../api/Admin/orderApi";

let BASE_URL = import.meta.env.VITE_API_URL;

export const adminOrder = async (dispatch) => {
  try {
    dispatch(adminOrdersRequest());

    const { data } = await getAdminAllOrdersApi();
    dispatch(adminOrderSuccess(data));
  } catch (error) {
    dispatch(adminOrderFail(error.response.data.message));
  }
};

// -------------------------------------------------------------------------------------------------------------------------------

export const adminDeleteOrder = (id) => async (dispatch) => {
  try {
    dispatch(deleteOrdersRequest());

    const { data } = await deleteAdminOrderApi(id);
    dispatch(deleteOrderSuccess(data));
  } catch (error) {
    dispatch(deleteOrderFail(error.response.data.message));
  }
};

// ---------------------------------------------------------------------------------------------------------------------------------

export const adminUpdateOrder = (id, orderData) => async (dispatch) => {
  try {
    dispatch(updateOrderRequest());

    const { data } = await updateAdminOrderApi(id, orderData);
    dispatch(updateOrderSuccess(data));
  } catch (error) {
    dispatch(updateOrderFail(error.response.data.message));
  }
};
