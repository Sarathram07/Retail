import axios from "axios";

import {
  addCartItemRequest,
  addCartItemSuccess,
  addCartItemFail,
} from "../reducer/cartSlice";

import { getProductById } from "../api/User/productApi";

const BASE_URL = import.meta.env.VITE_API_URL;

const addItemToCart = (pid, p_qty) => async (dispatch) => {
  try {
    dispatch(addCartItemRequest());

    //const { data: prodData } = await axios.get(BASE_URL + `/product/${pid}`);
    const { data: prodData } = await getProductById(pid);
    const prod = prodData.product;

    const dataToAdd = {
      productId: prod._id,
      name: prod.name,
      price: prod.price,
      stock: prod.stock,
      quantity: p_qty,
      image: prod.images[0].image,
    };

    dispatch(addCartItemSuccess(dataToAdd));
    // console.log("Item action success");
  } catch (error) {
    dispatch(addCartItemFail(error.response.data.message));
  }
};

export default addItemToCart;
