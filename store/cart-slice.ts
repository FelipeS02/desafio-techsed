import { Cart, CartItem } from '@/models/cart';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: Cart = {
  id: 1,
  items: [],
  createdAt: new Date().toISOString(),
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, { payload }: PayloadAction<CartItem>) => {
      state.items.push(payload);
    },
    removeItem: (state, { payload: itemId }: PayloadAction<number>) => {
      state.items = state.items.filter(
        ({ product: cartProduct }) => cartProduct.id !== itemId,
      );
    },
    editItem: (state, { payload: newItemState }: PayloadAction<CartItem>) => {
      const newState = state.items.map((storedItem) => {
        if (storedItem.product.id === newItemState.product.id) {
          return newItemState;
        }
        return storedItem;
      });

      state.items = newState;
    },
  },
});

export const { addItem, editItem, removeItem } = cartSlice.actions;

export default cartSlice.reducer;
