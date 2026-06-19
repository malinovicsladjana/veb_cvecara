import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cartItems: localStorage.getItem('cartItems')
    ? JSON.parse(localStorage.getItem('cartItems'))
    : [],
};

const saveCartItems = (cartItems) => {
  localStorage.setItem('cartItems', JSON.stringify(cartItems));
  return cartItems;
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existingItem = state.cartItems.find((x) => x.id === item.id);

      if (existingItem) {
        state.cartItems = state.cartItems.map((x) =>
          x.id === item.id
            ? { ...x, quantity: Math.min(5, x.quantity + item.quantity) }
            : x
        );
      } else {
        state.cartItems = [...state.cartItems, item];
      }

      state.cartItems = saveCartItems(state.cartItems);
    },
    removeFromCart: (state, action) => {
      state.cartItems = saveCartItems(
        state.cartItems.filter((x) => x.id !== action.payload)
      );
    },
    clearCart: (state) => {
      state.cartItems = saveCartItems([]);
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
