import React from "react";
import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  cartItems: [],
  location: [],
  geo: [{ lat: "17.4357403", lng: "78.4401809" }],
};

let slice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      state.cartItems.push(action.payload);
    },
    removeFromCart: (state, action) => {
      state.cartItems.splice(action.payload, 1);
    },
    clearCart: (state, action) => {
      state.cartItems = [];
    },
    addLoc: (state, action) => {
      state.location.push(action.payload);
    },
    deleteLoc: (state, action) => {
      state.location = [];
    },
    setG: (state, action) => {
      state.geo.push(action.payload);
    },
    clearG: (state, action) => {
      state.geo = [];
    },
  },
});
export const {
  addToCart,
  removeFromCart,
  clearCart,
  addLoc,
  deleteLoc,
  setG,
  clearG,
} = slice.actions;
export default slice.reducer;
