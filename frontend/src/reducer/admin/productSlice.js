import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "admin_NewProduct",
  initialState: {
    isLoading: false,
    isReviewSubmitted: false,
    isProductCreated: false,
    isProductUpdated: false,
    isProductDeleted: false,
  },
  reducers: {
    adminNewProductRequest(state, action) {
      return {
        ...state,
        isLoading: true,
      };
    },

    adminNewProductSuccess(state, action) {
      return {
        ...state,
        isLoading: false,
        productToDB: action.payload.product,
        isProductCreated: true,
      };
    },

    adminNewProductFail(state, action) {
      return {
        ...state,
        isLoading: false,
        isProductCreated: false,
        error: action.payload,
      };
    },

    // ----------------------------------------------------------------------------------------------------------------------------

    adminClearNewProduct(state, action) {
      return {
        ...state,
        isProductCreated: false,
      };
    },

    adminClearError(state, action) {
      return {
        ...state,
        error: null,
      };
    },

    // ----------------------------------------------------------------------------------------------------------------------------

    adminProductDeleteRequest(state, action) {
      return {
        ...state,
        isLoading: true,
      };
    },

    adminProductDeleteSuccess(state, action) {
      return {
        ...state,
        isLoading: false,
        isProductDeleted: true,
        deleteAction: action.payload,
      };
    },

    adminProductDeleteFail(state, action) {
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    },

    adminProductDeleted(state, action) {
      return {
        ...state,
        isProductDeleted: false,
      };
    },

    // ----------------------------------------------------------------------------------------------------------------------------

    adminUpdateProductRequest(state, action) {
      return {
        ...state,
        isLoading: true,
      };
    },

    adminUpdateProductSuccess(state, action) {
      return {
        ...state,
        isLoading: false,
        productToDB: action.payload.product,
        isProductUpdated: true,
      };
    },

    adminUpdateProductFail(state, action) {
      return {
        ...state,
        isLoading: false,
        isProductUpdated: false,
        error: action.payload,
      };
    },

    adminClearUpdated(state, action) {
      return {
        ...state,
        isProductUpdated: false,
      };
    },

    // ----------------------------------------------------------------------------------------------------------------------------
  },
});

export const {
  adminNewProductRequest,
  adminNewProductSuccess,
  adminNewProductFail,
} = productSlice.actions;

export const {
  adminProductDeleteRequest,
  adminProductDeleteSuccess,
  adminProductDeleteFail,
} = productSlice.actions;

export const {
  adminUpdateProductRequest,
  adminUpdateProductSuccess,
  adminUpdateProductFail,
} = productSlice.actions;

export const {
  adminClearNewProduct,
  adminClearError,
  adminProductDeleted,
  adminClearUpdated,
} = productSlice.actions;

export default productSlice.reducer;
