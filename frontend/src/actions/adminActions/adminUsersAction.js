import {
  adminUsersRequest,
  adminUsersSuccess,
  adminUsersFail,
  adminSingleUserRequest,
  adminSingleUserSuccess,
  adminSingleUserFail,
  adminUpdateUserRequest,
  adminUpdateUserSuccess,
  adminUpdateUserFail,
  adminDeleteUserRequest,
  adminDeleteUserSuccess,
  adminDeleteUserFail,
} from "../../reducer/admin/userSlice";

import {
  getAdminUsersApi,
  getAdminSingleUsersApi,
  updateAdminUserApi,
  deleteAdminUserApi,
} from "../../api/Admin/usersApi";

export const getAdminUsers = async (dispatch) => {
  try {
    dispatch(adminUsersRequest());

    const { data } = await getAdminUsersApi();
    dispatch(adminUsersSuccess(data));
  } catch (error) {
    dispatch(adminUsersFail(error.response.data.message));
  }
};

// --------------------------------------------GET_SINGLE_USER---------------------------------------------------------

export const getAdminSingleUser = (uid) => async (dispatch) => {
  try {
    dispatch(adminSingleUserRequest());

    const { data } = await getAdminSingleUsersApi(uid);
    dispatch(adminSingleUserSuccess(data));
  } catch (error) {
    dispatch(adminSingleUserFail(error.response.data.message));
  }
};

// --------------------------------------------UPDATE_USER----------------------------------------------------------

export const updateAdminUser = (uid, formData) => async (dispatch) => {
  try {
    dispatch(adminUpdateUserRequest());

    // const optionConfig = {
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   withCredentials: true,
    // };
    const { data } = await updateAdminUserApi(uid, formData);
    dispatch(adminUpdateUserSuccess(data));
  } catch (error) {
    dispatch(adminUpdateUserFail(error.response.data.message));
  }
};

// --------------------------------------------DELETE_USER---------------------------------------------------------

export const deleteAdminUser = (id) => async (dispatch) => {
  try {
    dispatch(adminDeleteUserRequest());

    const { data } = await deleteAdminUserApi(id);
    dispatch(adminDeleteUserSuccess(data));
  } catch (error) {
    dispatch(adminDeleteUserFail(error.response.data.message));
  }
};

// --------------------------------------------CLEAR_ACTIONS---------------------------------------------------------
