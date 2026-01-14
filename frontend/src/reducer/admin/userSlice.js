import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "admin_user",
  initialState: {
    isLoading: false,
    isUserUpdated: false,
    isUserDeleted: false,
    multipleUsers: [],
    user: {},
  },
  reducers: {
    adminUsersRequest(state, action) {
      return {
        ...state,
        isLoading: true,
      };
    },

    adminUsersSuccess(state, action) {
      return {
        ...state,
        isLoading: false,
        multipleUsers: action.payload.users,
      };
    },

    adminUsersFail(state, action) {
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    },

    // --------------------------------------------------------------------------------------------------------------------

    adminSingleUserRequest(state, action) {
      return {
        ...state,
        isLoading: true,
      };
    },

    adminSingleUserSuccess(state, action) {
      return {
        ...state,
        isLoading: false,
        user: action.payload.user,
      };
    },

    adminSingleUserFail(state, action) {
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    },

    // ----------------------------------------------------------------------------------------------------------------------

    adminDeleteUserRequest(state, action) {
      return {
        ...state,
        isLoading: true,
      };
    },

    adminDeleteUserSuccess(state, action) {
      return {
        ...state,
        isLoading: false,
        isUserDeleted: true,
      };
    },

    adminDeleteUserFail(state, action) {
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    },

    // ----------------------------------------------------------------------------------------------------------------------

    adminUpdateUserRequest(state, action) {
      return {
        ...state,
        isLoading: true,
      };
    },

    adminUpdateUserSuccess(state, action) {
      return {
        ...state,
        isLoading: false,
        isUserUpdated: true,
      };
    },

    adminUpdateUserFail(state, action) {
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    },

    // ----------------------------------------------------------------------------------------------------------------------

    clearAdminUserDeleted(state, action) {
      return {
        ...state,
        isUserDeleted: false,
      };
    },

    clearAdminUserUpdated(state, action) {
      return {
        ...state,
        isUserUpdated: false,
      };
    },

    clearAdminUserError(state, action) {
      return {
        ...state,
        error: null,
      };
    },
  },
});

export const {
  clearAdminUserError,
  clearAdminUserDeleted,
  clearAdminUserUpdated,
} = userSlice.actions;

export const { adminUsersRequest, adminUsersSuccess, adminUsersFail } =
  userSlice.actions;

export const {
  adminSingleUserRequest,
  adminSingleUserSuccess,
  adminSingleUserFail,
} = userSlice.actions;

export const {
  adminUpdateUserRequest,
  adminUpdateUserSuccess,
  adminUpdateUserFail,
} = userSlice.actions;

export const {
  adminDeleteUserRequest,
  adminDeleteUserSuccess,
  adminDeleteUserFail,
} = userSlice.actions;

export default userSlice.reducer;
