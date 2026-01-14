import {
  createOrderRequest,
  createOrderSuccess,
  createOrderFail,
  userOrdersRequest,
  userOrderSuccess,
  userOrdersFail,
  orderDetailRequest,
  orderDetailSuccess,
  orderDetailFail,
} from "../reducer/orderSlice";

import {
  createOrderApi,
  getUserOrders,
  showOrderDetail as showOrderDetailApi,
} from "../api/User/orderApi";

// -----------------------------------------------------------------------------------------------------------

export const createOrder = (orderDetails) => async (dispatch) => {
  try {
    dispatch(createOrderRequest());

    const { data } = await createOrderApi(orderDetails);
    dispatch(createOrderSuccess(data));
  } catch (error) {
    dispatch(createOrderFail(error.response.data.message));
  }
};

// -----------------------------------------------------------------------------------------------------------

export const userOrders = async (dispatch) => {
  try {
    dispatch(userOrdersRequest());

    const { data } = await getUserOrders();
    dispatch(userOrderSuccess(data));
  } catch (error) {
    dispatch(userOrdersFail(error.response.data.message));
  }
};

// -----------------------------------------------------------------------------------------------------------

export const showOrderDetail = (orderId) => async (dispatch) => {
  try {
    dispatch(orderDetailRequest());

    const { data } = await showOrderDetailApi(orderId);
    dispatch(orderDetailSuccess(data));
  } catch (error) {
    dispatch(orderDetailFail(error.response.data.message));
  }
};
