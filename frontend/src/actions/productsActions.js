import {
  productsLoadingRequest,
  productsSuccess,
  productsFail,
} from "../reducer/productsSlice";

import { getProductsApi } from "../api/User/productsApi";

export const getProducts =
  (keyword, price, categoryVal, rating, currentPage) => async (dispatch) => {
    try {
      dispatch(productsLoadingRequest());
      // let url_link = `${BASE_URL}/products?page=${currentPage}`;
      // if (keyword) {
      //   url_link += `&keyword=${keyword}`;
      // }
      // if (price) {
      //   url_link += `&price[gte]=${price[0]}&price[lte]=${price[1]}`;
      // }
      // if (categoryVal) {
      //   url_link += `&category=${categoryVal}`;
      // }
      // if (rating) {
      //   url_link += `&ratings=${rating}`;
      // }
      //const dataFetched = await axios.get(url_link);

      const params = {
        page: currentPage,
        keyword,
        price,
        category: categoryVal,
        ratings: rating,
      };

      const dataFetched = await getProductsApi(params);
      const prodData = dataFetched.data;
      dispatch(productsSuccess(prodData));
    } catch (error) {
      //dispatch(productsFail(error.response.data.message));
      dispatch(productsFail(error.message));
      // res
      //   .status(500)
      //   .send(
      //     "Internal Server Error - Error while fetching products data from DB"
      //   );
    }
  };
