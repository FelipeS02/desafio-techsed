'use client';

import { FC } from 'react';

import { ShoppingCart } from 'lucide-react';

import { Button } from '@/components/ui/button';
import CartShoppingDelete from '@/components/icons/cart-shopping-delete';

import useCartItem from '@/hooks/use-cart-item';
import useItemQuantityCalculator from '@/hooks/use-item-quantity-calculator';
import { type Product } from '@/models/product';

import ItemQuantitySelector from '../catalog/item/item-quantity-calculator';

const CartOptions: FC<{ product: Product }> = ({ product }) => {
  const {
    handleAdd,
    handleDelete,
    isCartProductEdited,
    itemInCart,
    quantity,
    setQuantity,
  } = useCartItem(product);

  const [values, handleChange] = useItemQuantityCalculator(product, setQuantity);

  return (
    <div className='flex flex-col gap-4'>
      <div className='inline-flex flex-col gap-2'>
        <span>
          Cantidad:{' '}
          <span className='text-foreground-secondary'>
            ({product.stock} disponibles)
          </span>{' '}
        </span>
        <ItemQuantitySelector
          values={values}
          onChange={handleChange}
          product={product}
        />
      </div>

      {itemInCart && !isCartProductEdited ? (
        <Button variant='outline' onClick={handleDelete}>
          <CartShoppingDelete /> Eliminar del carrito
        </Button>
      ) : (
        <Button disabled={quantity === 0} onClick={handleAdd}>
          <ShoppingCart />{' '}
          {!isCartProductEdited ? 'Agregar al carrito' : 'Guardar selección'}
        </Button>
      )}
    </div>
  );
};

export default CartOptions;
