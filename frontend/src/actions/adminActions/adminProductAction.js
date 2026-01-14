import {
  adminNewProductRequest,
  adminNewProductSuccess,
  adminNewProductFail,
  adminProductDeleteRequest,
  adminProductDeleteSuccess,
  adminProductDeleteFail,
  adminUpdateProductRequest,
  adminUpdateProductSuccess,
  adminUpdateProductFail,
} from "../../reducer/admin/productSlice";

import {
  createNewAdminProductsApi,
  deleteAdminProductApi,
  updateAdminProductApi,
} from "../../api/Admin/productApi";

// -------------------------------------------------------------------------------------------------------------------------------

export const createNewAdminProducts = (productData) => async (dispatch) => {
  try {
    dispatch(adminNewProductRequest());

    const { data } = await createNewAdminProductsApi(productData);
    dispatch(adminNewProductSuccess(data));
  } catch (error) {
    dispatch(adminNewProductFail(error.response.data.message));
  }
};

// -------------------------------------------------------------------------------------------------------------------------------

export const deleteAdminProduct = (pid) => async (dispatch) => {
  try {
    dispatch(adminProductDeleteRequest());

    const { data } = await deleteAdminProductApi(pid);
    dispatch(adminProductDeleteSuccess(data));
  } catch (error) {
    dispatch(adminProductDeleteFail(error.response.data.message));
  }
};

// -------------------------------------------------------------------------------------------------------------------------------

export const updateAdminProducts = (id, updateData) => async (dispatch) => {
  try {
    dispatch(adminUpdateProductRequest());

    const { data } = await updateAdminProductApi(id, updateData);
    dispatch(adminUpdateProductSuccess(data));
  } catch (error) {
    dispatch(adminUpdateProductFail(error.response.data.message));
  }
};
