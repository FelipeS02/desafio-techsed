import { useCallback, useState } from 'react';

import { CartItem } from '@/schemas/cart-schema';
import { Product } from '@/schemas/product-schema';
import { addItem, editItem, removeItem } from '@/store/cart-slice';

import { useAppDispatch, useAppSelector } from './redux';

export default function useCartItem(product: Product) {
  const dispatch = useAppDispatch();

  // Check if item is in cart and get his state
  const itemInCart = useAppSelector((state) =>
    state.cart.items.find(
      ({ product: cartProduct }) => cartProduct.id === product.id,
    ),
  );

  const [quantity, setQuantity] = useState<number>(0);

  const isCartProductEdited = itemInCart && itemInCart.quantity !== quantity;

  const handleDelete = useCallback(() => {
    dispatch(removeItem(product.id));
  }, [dispatch, product]);

  const handleAdd = useCallback(() => {
    const payload: CartItem = {
      quantity,
      product,
    };

    if (isCartProductEdited) return dispatch(editItem(payload));

    return dispatch(addItem(payload));
  }, [dispatch, isCartProductEdited, product, quantity]);

  return {
    handleDelete,
    handleAdd,
    quantity,
    setQuantity,
    dispatch,
    isCartProductEdited,
    itemInCart,
  };
}
