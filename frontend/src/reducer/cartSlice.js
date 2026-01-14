import { createSlice } from "@reduxjs/toolkit";
import {
  getFromLocalStorage,
  removeFromLocalStorage,
  removeFromSessionStorage,
  setToLocalStorage,
} from "../utils/storage";
import { showWarningToast } from "../utils/toastUtils";

// const getFromLocalStorage = (key, defaultValue) => {
//   const data = localStorage.getItem(key);
//   return data ? JSON.parse(data) : defaultValue;
// };

// const setToLocalStorage = (key, data) => {
//   localStorage.setItem(key, JSON.stringify(data));
//   return;
// };

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    isLoading: false,
    cartItems: getFromLocalStorage("cart_Items", []),
    shippingInfo: getFromLocalStorage("cart_shippingInfo", {}),
  },
  reducers: {
    addCartItemRequest(state, action) {
      return {
        ...state,
        isLoading: true,
      };
    },

    addCartItemSuccess(state, action) {
      const dataToBeAdded = action.payload;
      const isItemExist = state.cartItems.find(
        (i) => i.productId === dataToBeAdded.productId
      );

      if (isItemExist) {
        showWarningToast("Item already Added to cart");
      } else {
        state = {
          //...state,
          cartItems: [...state.cartItems, dataToBeAdded],
        };
        setToLocalStorage("cart_Items", state.cartItems);
      }
      state.isLoading = false;
      return state;
    },

    addCartItemFail(state, action) {
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    },

    // --------------------------------------------CHANGE_QUANTITY----------------------------------------------------------

    // increaseCartItemQty(state, action) {
    //   const item = state.cartItems.find(
    //     (i) => i.productId === action.payload
    //   );

    //   if (!item) return;

    //   if (item.quantity < item.stock) {
    //     item.quantity += 1;
    //     setToLocalStorage("cart_Items", state.cartItems);
    //   }
    // },

    // decreaseCartItemQty(state, action) {
    //   const item = state.cartItems.find(
    //     (i) => i.productId === action.payload
    //   );

    //   if (!item) return;

    //   if (item.quantity > 1) {
    //     item.quantity -= 1;
    //     setToLocalStorage("cart_Items", state.cartItems);
    //   }
    // },

    increaseCartItemQty(state, action) {
      state.cartItems = state.cartItems.map((item) => {
        if (item.productId === action.payload) {
          item.quantity += 1;
        }
        return item;
      });
      setToLocalStorage("cart_Items", state.cartItems);
      //localStorage.setItem("cart_Items", JSON.stringify(state.cartItems));
    },

    decreaseCartItemQty(state, action) {
      state.cartItems = state.cartItems.map((item) => {
        if (item.productId === action.payload) {
          item.quantity -= 1;
        }
        return item;
      });
      setToLocalStorage("cart_Items", state.cartItems);
    },

    // --------------------------------------------REMOVE_ITEM----------------------------------------------------------

    removeItemFromCart(state, action) {
      const filterItem = state.cartItems.filter((item) => {
        return item.productId !== action.payload;
      });

      setToLocalStorage("cart_Items", state.cartItems);
      return {
        ...state,
        cartItems: filterItem,
      };
    },

    // --------------------------------------------SAVE_SHIPPING_INFO---------------------------------------------------

    saveShippingInfo(state, action) {
      setToLocalStorage("cart_shippingInfo", action.payload);
      //setToLocalStorage("cart_shippingInfo", state.shippingInfo);
      return {
        ...state,
        shippingInfo: action.payload,
      };
    },

    // --------------------------------------------ORDER_COMPLETE---------------------------------------------------

    orderCompleted(state, action) {
      removeFromLocalStorage("cart_Items");
      removeFromLocalStorage("cart_shippingInfo");
      removeFromSessionStorage("order_Info");
      return {
        isLoading: false,
        cartItems: [],
        shippingInfo: {},
      };
    },
  },
});

export const { addCartItemRequest, addCartItemSuccess, addCartItemFail, removeItemFromCart } =
  cartSlice.actions;

export const { increaseCartItemQty, decreaseCartItemQty } = cartSlice.actions;

export const { saveShippingInfo, orderCompleted } = cartSlice.actions;

export default cartSlice.reducer;
