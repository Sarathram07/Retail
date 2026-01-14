import { createSlice } from "@reduxjs/toolkit";

const reviewSlice = createSlice({
  name: "admin_review",
  initialState: {
    isLoading: false,
    isReviewDeleted: false,
    reviewsData: [],
  },
  reducers: {
    adminReviewsRequest(state, action) {
      return {
        ...state,
        isLoading: true,
      };
    },

    adminReviewsSuccess(state, action) {
      return {
        ...state,
        isLoading: false,
        reviewsData: action.payload.reviews,
      };
    },

    adminReviewsFail(state, action) {
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    },

    //---------------------------------------------------------------------------------------------------------------------------------

    adminDeleteReviewRequest(state, action) {
      return {
        ...state,
        isLoading: true,
      };
    },

    adminDeleteReviewSuccess(state, action) {
      return {
        ...state,
        isLoading: false,
        isReviewDeleted: true,
      };
    },

    adminDeleteReviewFail(state, action) {
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    },

    //---------------------------------------------------------------------------------------------------------------------------------
    clearAdminReviewError(state, action) {
      return {
        ...state,
        error: null,
      };
    },

    clearAdminDeleteReview(state, action) {
      return {
        ...state,
        isReviewDeleted: false,
      };
    },
  },
});

export const { adminReviewsRequest, adminReviewsSuccess, adminReviewsFail } =
  reviewSlice.actions;

export const {
  adminDeleteReviewRequest,
  adminDeleteReviewSuccess,
  adminDeleteReviewFail,
} = reviewSlice.actions;

export const { clearAdminReviewError, clearAdminDeleteReview } =
  reviewSlice.actions;

export default reviewSlice.reducer;
