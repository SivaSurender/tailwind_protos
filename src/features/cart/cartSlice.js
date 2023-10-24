import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cart: [
    // {
    //   pizzaId: 1,
    //   name: 'Margherita',
    //   unitPrice: 12,
    //   quantity: 14,
    //   totalPrice: 146,
    // },
  ],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action) {
      state.cart.push(action.payload);
    },
    deleteItem(state, action) {
      state.cart = state.cart.filter((each) => each.pizzaId !== action.payload);
    },
    increasePizzaQuantity(state, action) {
      const item = state.cart.find((each) => each.pizzaId === action.pizzaId);
      item.quantity++;
      item.totalPrice = item.unitPrice * item.quantity;
    },
    decreasePizzaQuantity(state, action) {
      const item = state.cart.find((each) => each.pizzaId === action.pizzaId);
      item.quantity--;
      item.totalPrice = item.unitPrice * item.quantity;
    },
    clearCart(state, action) {
      state.cart = [];
    },
  },
});

export const {
  addItem,
  deleteItem,
  increasePizzaQuantity,
  decreasePizzaQuantity,
  clearCart,
} = cartSlice.actions;

export const getPizzaCount = (state) =>
  state.cart.cart.reduce((acc, curr) => acc + curr.quantity, 0);

export const getTotalPrice = (state) =>
  state.cart.cart.reduce((acc, curr) => acc + curr.totalPrice, 0);

export const getQuantitybyId = (id) => (state) =>
  state.cart.cart.find((eachItem) => eachItem.pizzaId === id)?.quantity ?? 0;

export default cartSlice.reducer;
