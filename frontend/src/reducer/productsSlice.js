import { createSlice } from "@reduxjs/toolkit";

const prodSlice = createSlice({
  name: "products",
  initialState: {
    isLoading: false,
  },
  reducers: {
    productsLoadingRequest(state, action) {
      return {
        isLoading: true,
      };
    },

    productsSuccess(state, action) {
      return {
        isLoading: false,
        productsFromDB: action.payload.products,
        // productCount: action.payload.count,
        //resPerPage: action.payload.resPerPage,
      };
    },

    productsFail(state, action) {
      return {
        isLoading: false,
        error: action.payload,
      };
    },
  },
});

// In older version ( ie. using "redux" ) create action creater for reducers, which creates ActionObject
// Action Object - A plain object describing something that happened - { type: 'add/todo', payload: 'Buy milk' }
// Action Creator - Function that returns an action object - addTodo('Buy milk')

export const { productsLoadingRequest, productsSuccess, productsFail } =
  prodSlice.actions;

export default prodSlice.reducer;
