import {
  adminDeleteReviewFail,
  adminDeleteReviewRequest,
  adminDeleteReviewSuccess,
  adminReviewsFail,
  adminReviewsRequest,
  adminReviewsSuccess,
} from "../../reducer/admin/reviewSlice";

import {
  getAdminReviewsApi,
  deleteAdminReviewApi,
} from "../../api/Admin/reviewsApi";

export const getAdminReviews = (prodid) => async (dispatch) => {
  try {
    dispatch(adminReviewsRequest());

    const optionConfig = {
      params: { pid: prodid },
    };
    const { data } = await getAdminReviewsApi(optionConfig);
    dispatch(adminReviewsSuccess(data));
  } catch (error) {
    dispatch(adminReviewsFail(error.response.data.message));
  }
};

// ----------------------------------------------------------------------------------------------------------------------------------

export const deleteAdminReviews = (pid, reviewID) => async (dispatch) => {
  try {
    dispatch(adminDeleteReviewRequest());

    const optionConfig = {
      params: { productId: pid, id: reviewID },
    };
    const { data } = await deleteAdminReviewApi(optionConfig);
    dispatch(adminDeleteReviewSuccess(data));
  } catch (error) {
    dispatch(adminDeleteReviewFail(error.response.data.message));
  }
};
