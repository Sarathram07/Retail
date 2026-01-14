import {
  productLoadingRequest,
  productSuccess,
  productFail,
  createReviewRequest,
  createReviewSuccess,
  createReviewFail,
} from "../reducer/productSlice";

import { getProductById, createReviewApi } from "../api/User/productApi";

export const getProduct = (prodid) => async (dispatch) => {
  try {
    dispatch(productLoadingRequest());
    const { data } = await getProductById(prodid);
    dispatch(productSuccess(data));
  } catch (error) {
    //dispatch(productsFail(error.response.data.message));
    dispatch(productFail(error.message));
    // res
    //   .status(500)
    //   .send(
    //     "Internal Server Error - Error while fetching products data from DB"
    //   );
  }
};

// ---------------------------------------------------------------------------------------------------------------------------

export const createReview = (reviewData) => async (dispatch) => {
  try {
    dispatch(createReviewRequest());

    const { data } = await createReviewApi(reviewData);
    dispatch(createReviewSuccess(data));
  } catch (error) {
    dispatch(createReviewFail(error.response.data.message));
  }
};
