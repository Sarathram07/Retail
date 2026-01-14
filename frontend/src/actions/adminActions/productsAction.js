import {
  adminProductsLoadingRequest,
  adminProductsSuccess,
  adminProductsFail,
} from "../../reducer/admin/productsSlice";

import { getAdminProductsApi } from "../../api/Admin/productsApi";

export const getAdminProducts = async (dispatch) => {
  try {
    dispatch(adminProductsLoadingRequest());

    const { data } = await getAdminProductsApi();
    dispatch(adminProductsSuccess(data));
  } catch (error) {
    dispatch(adminProductsFail(error.response.data.message));
  }
};
