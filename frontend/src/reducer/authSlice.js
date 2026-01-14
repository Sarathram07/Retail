import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoading: true,
    isAuthenticated: false,
  },
  reducers: {
    loginRequest(state, action) {
      return {
        ...state,
        isLoading: true,
      };
    },

    loginSuccess(state, action) {
      return {
        isLoading: false,
        isAuthenticated: true,
        user: action.payload.user,
      };
    },

    loginFail(state, action) {
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    },

    // --------------------------------------------------CLEAR---------------------------------------------------

    clearLoginError(state, action) {
      return {
        ...state,
        error: null,
      };
    },

    clearUpdateBoolean(state, action) {
      return {
        ...state,
        isUpdated: false,
      };
    },

    // --------------------------------------------------REGISTER---------------------------------------------------

    registerRequest(state, action) {
      return {
        ...state,
        isLoading: true,
      };
    },

    registerSuccess(state, action) {
      return {
        isLoading: false,
        isAuthenticated: true,
        user: action.payload.user,
      };
    },

    registerFail(state, action) {
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    },

    // --------------------------------------------------LOGIN_USER_DATA---------------------------------------------------

    loadUserRequest(state, action) {
      return {
        ...state,
        isLoading: true,
        isAuthenticated: false,
      };
    },

    loadUserSuccess(state, action) {
      return {
        isLoading: false,
        isAuthenticated: true,
        user: action.payload.user,
      };
    },

    loadUserFail(state, action) {
      return {
        ...state,
        isLoading: false,
        //error: action.payload,
      };
    },

    // --------------------------------------------------LOGOUT---------------------------------------------------

    logoutUserSuccess(state, action) {
      return {
        isLoading: false,
        isAuthenticated: false,
      };
    },

    logoutUserFail(state, action) {
      return {
        ...state,
        error: action.payload,
      };
    },

    // --------------------------------------------------UPDATE_PROFILE_DATA---------------------------------------------------

    updateProfileRequest(state, action) {
      return {
        ...state,
        isLoading: true,
        isUpdated: false,
      };
    },

    updateProfileSuccess(state, action) {
      return {
        ...state,
        isLoading: false,
        user: action.payload.user,
        isUpdated: true,
      };
    },

    updateProfileFail(state, action) {
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    },

    // --------------------------------------------------PASSWORD_CHANGE---------------------------------------------------

    updatePasswordRequest(state, action) {
      return {
        ...state,
        isLoading: true,
        isUpdatedPassword: false,
      };
    },

    updatePasswordSuccess(state, action) {
      return {
        ...state,
        isLoading: false,
        isUpdatedPassword: true,
      };
    },

    updatePasswordFail(state, action) {
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    },

    // --------------------------------------------------FORGOT_PASSWORD--------------------------------------------------

    forgotPasswordRequest(state, action) {
      return {
        ...state,
        isLoading: true,
        message: null,
      };
    },

    forgetPasswordSuccess(state, action) {
      return {
        ...state,
        isLoading: false,
        message: action.payload.message,
      };
    },

    forgotPasswordFail(state, action) {
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    },

    // --------------------------------------------------RESET_PASSWORD-------------------------------------------------

    resetPasswordRequest(state, action) {
      return {
        ...state,
        isLoading: true,
      };
    },

    resetPasswordSuccess(state, action) {
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        user: action.payload.user,
      };
    },

    resetPasswordFail(state, action) {
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    },
  },
});

export const { loginRequest, loginSuccess, loginFail } = authSlice.actions;

export const { clearUpdateBoolean, clearLoginError } = authSlice.actions;

export const { registerRequest, registerSuccess, registerFail } =
  authSlice.actions;

export const { loadUserRequest, loadUserSuccess, loadUserFail } =
  authSlice.actions;

export const { updateProfileRequest, updateProfileSuccess, updateProfileFail } =
  authSlice.actions;

export const {
  updatePasswordRequest,
  updatePasswordSuccess,
  updatePasswordFail,
} = authSlice.actions;

export const {
  forgotPasswordRequest,
  forgetPasswordSuccess,
  forgotPasswordFail,
  resetPasswordRequest,
  resetPasswordSuccess,
  resetPasswordFail,
} = authSlice.actions;

export const { logoutUserSuccess, logoutUserFail } = authSlice.actions;

export default authSlice.reducer;
