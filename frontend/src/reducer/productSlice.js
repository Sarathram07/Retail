import { createSlice } from "@reduxjs/toolkit";

const prodSlice = createSlice({
  name: "product",
  initialState: {
    isLoading: false,
    isReviewSubmitted: false,
    // product: {},
  },
  reducers: {
    productLoadingRequest(state, action) {
      return {
        ...state,
        isLoading: true,
      };
    },

    productSuccess(state, action) {
      return {
        ...state,
        isLoading: false,
        productFromDB: action.payload.product,
      };
    },

    productFail(state, action) {
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    },

    clearProduct(state, action) {
      return {
        ...state,
        productFromDB: {},
      };
    },

    // -------------------------------------------------------REVIEW_REDUCER-----------------------------------------------------------
    createReviewRequest(state, action) {
      return {
        ...state,
        isLoading: true,
      };
    },

    createReviewSuccess(state, action) {
      return {
        ...state,
        isLoading: false,
        isReviewSubmitted: true,
      };
    },

    createReviewFail(state, action) {
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    },

    clearReviewSubmitted(state, action) {
      return { ...state, isReviewSubmitted: false };
    },

    clearReviewError(state, action) {
      return {
        ...state,
        error: null,
      };
    },
  },
});

export const {
  productLoadingRequest,
  productSuccess,
  productFail,
  clearProduct,
} = prodSlice.actions;

export const {
  createReviewRequest,
  createReviewSuccess,
  createReviewFail,
  clearReviewSubmitted,
  clearReviewError,
} = prodSlice.actions;

export default prodSlice.reducer;
