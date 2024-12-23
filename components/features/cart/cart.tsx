'use client';

import { FC, useMemo } from 'react';

import { ShoppingCart } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Drawer,
  DrawerContent,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import CartShoppingDelete from '@/components/icons/cart-shopping-delete';

import { formatCurrency } from '@/lib/formatters';
import { useAppSelector } from '@/hooks/redux';

import { CartItem as CartItemType } from '@/schemas/cart-schema';

import CartItem from './cart-item';

export const RenderCartItems: FC<{ items: CartItemType[] }> = ({ items }) => {
  const total = useMemo(() => {
    return items.reduce(
      (accumulator, item) =>
        (accumulator += item.product.price * item.quantity),
      0,
    );
  }, [items]);

  if (items?.length === 0)
    return (
      <div
        className='flex flex-grow flex-col items-center justify-center text-neutral-400'
        aria-label='No products found'
        data-testid='no-products-screen'
      >
        <CartShoppingDelete size={124} strokeWidth={1.5} />
        <span className='text-lg'>Aun no has agregado ningun producto</span>
      </div>
    );

  const productsText = items.length === 1 ? 'producto' : 'productos';

  return (
    <>
      {items.map((item) => (
        <CartItem item={item} key={`cart-product-${item.product.id}`} />
      ))}
      <span
        className='mt-2 inline-flex justify-between text-base text-foreground-secondary'
        data-testid='cart-total'
      >
        Total de {items.length} {productsText}:{' '}
        <span className='font-medium text-foreground'>
          {formatCurrency(total)}
        </span>
      </span>
    </>
  );
};

const Cart = () => {
  const items = useAppSelector((state) => state.cart.items);

  return (
    <Drawer direction='right'>
      <DrawerTrigger asChild>
        <Button variant='ghost' size='icon'>
          <ShoppingCart />
        </Button>
      </DrawerTrigger>

      <DrawerContent className='right-0 mt-0 h-full w-full max-w-sm'>
        <div className='h-full w-full p-4'>
          <DrawerTitle>Tu pedido</DrawerTitle>
          <div className='flex h-full flex-col'>
            <RenderCartItems items={items} />
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default Cart;
