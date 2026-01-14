import React from "react";
import {
  loginRequest,
  loginSuccess,
  loginFail,
  clearLoginError,
  clearUpdateBoolean,
  registerRequest,
  registerSuccess,
  registerFail,
  loadUserRequest,
  loadUserSuccess,
  loadUserFail,
  logoutUserSuccess,
  logoutUserFail,
  updateProfileRequest,
  updateProfileSuccess,
  updateProfileFail,
  updatePasswordRequest,
  updatePasswordSuccess,
  updatePasswordFail,
  forgotPasswordRequest,
  forgetPasswordSuccess,
  forgotPasswordFail,
  resetPasswordRequest,
  resetPasswordSuccess,
  resetPasswordFail,
} from "../reducer/authSlice";

import {
  loginUser,
  logoutUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  updateUserPassword,
  forgotUserPassword,
  resetUserPassword,
} from "../api/User/userApi";

// --------------------------------------------CLEAR_ERRORS & CLEAR_UPDATE_BOOLEAN-------------------------------------

export const clearAuthError = (dispatch) => {
  dispatch(clearLoginError());
};

export const clearUpdateProfile = (dispatch) => {
  dispatch(clearUpdateBoolean());
};

// --------------------------------------------LOGIN----------------------------------------------------------------

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch(loginRequest());

    const body = {
      email,
      password,
    };
    const { data } = await loginUser(body);
    dispatch(loginSuccess(data));
  } catch (error) {
    dispatch(loginFail(error.response.data.message));
  }
};

// --------------------------------------------REGISTER----------------------------------------------------------------

// data sent in post will be multipart form data
export const register = (newUserData) => async (dispatch) => {
  try {
    dispatch(registerRequest());

    const optionConfig = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    const { data } = await registerUser(newUserData, optionConfig);
    dispatch(registerSuccess(data));
  } catch (error) {
    dispatch(registerFail(error.response.data.message));
  }
};

// --------------------------------------------GET_USER_PROFILE_LOGIN-------------------------------------------------

export const loadUser = async (dispatch) => {
  try {
    dispatch(loadUserRequest());

    const { data } = await getUserProfile();
    dispatch(loadUserSuccess(data));
  } catch (error) {
    dispatch(loadUserFail(error.response.data.message));
  }
};

// --------------------------------------------UPDATE_PROFILE_DATA-----------------------------------------------------

export const updateProfile = (newUpdateData) => async (dispatch) => {
  try {
    dispatch(updateProfileRequest());

    const optionConfig = {
      headers: {
        "content-Type": "multipart/form-data",
      },
    };
    const { data } = await updateUserProfile(newUpdateData, optionConfig);
    dispatch(updateProfileSuccess(data));
  } catch (error) {
    dispatch(updateProfileFail(error.response.data.message));
  }
};

// --------------------------------------------UPDATE_PASSWORD---------------------------------------------------------

export const updatePassword = (passwordDetails) => async (dispatch) => {
  try {
    dispatch(updatePasswordRequest());

    await updateUserPassword(passwordDetails);
    dispatch(updatePasswordSuccess());
  } catch (error) {
    dispatch(updatePasswordFail(error.response.data.message));
  }
};

// --------------------------------------------FORGOT_PASSWORD---------------------------------------------------------

export const forgotPassword = (details) => async (dispatch) => {
  try {
    dispatch(forgotPasswordRequest());

    const { data } = await forgotUserPassword(details);
    dispatch(forgetPasswordSuccess(data));
  } catch (error) {
    dispatch(forgotPasswordFail(error.response.data.message));
  }
};

// --------------------------------------------RESET_PASSWORD---------------------------------------------------------

export const resetPassword = (resetDetails, token) => async (dispatch) => {
  try {
    dispatch(resetPasswordRequest());

    const { data } = await resetUserPassword(resetDetails, token);
    dispatch(resetPasswordSuccess(data));
  } catch (error) {
    dispatch(resetPasswordFail(error.response.data.message));
  }
};

// ------------------------------------------------------------LOGOUT-------------------------------------------------

export const logout = async (dispatch) => {
  try {
    const { data } = await logoutUser();
    dispatch(logoutUserSuccess());
  } catch (error) {
    dispatch(logoutUserFail(error.response.data.message));
  }
};
