'use client';

import { FC, useMemo } from 'react';

import { ShoppingCart } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import CartShoppingDelete from '@/components/icons/cart-shopping-delete';

import { formatCurrency } from '@/lib/formatters';
import { useAppSelector } from '@/hooks/redux';
import { type CartItem as CartItemType } from '@/models/cart';

import CartItem from './cart-item';

export const CartItems: FC<{ items: CartItemType[] }> = ({ items }) => {
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
      <div className='flex max-h-full flex-grow flex-col overflow-y-auto px-4'>
        {items.map((item) => (
          <CartItem
            item={item}
            className='last-of-type:mb-20 last-of-type:border-none'
            key={`cart-product-${item.product.id}`}
          />
        ))}
      </div>
      <DrawerFooter
        className='sticky bottom-0 mt-auto inline-flex w-full flex-row justify-between bg-background text-base text-foreground-secondary'
        data-testid='cart-total'
      >
        Total de {items.length} {productsText}:{' '}
        <span className='font-medium text-foreground'>
          {formatCurrency(total)}
        </span>
      </DrawerFooter>
    </>
  );
};

const Cart = () => {
  const items = useAppSelector((state) => state.cart.items);

  return (
    <Drawer direction='right'>
      <DrawerTrigger asChild>
        <Button
          variant='ghost'
          size='icon'
          className='relative after:absolute after:right-0 after:top-0 after:size-[1rem] after:rounded-full after:bg-brand after:text-xs after:text-primary-foreground after:content-[attr(data-quantity)] after:data-[quantity=0]:hidden'
          data-quantity={items.length}
        >
          <ShoppingCart />
        </Button>
      </DrawerTrigger>

      <DrawerContent className='right-0 mt-0 h-screen w-full max-w-sm'>
        <div className='h-full max-h-full w-full'>
          <DrawerTitle className='px-4 pb-4'>Tu pedido</DrawerTitle>

          <CartItems items={items} />
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default Cart;
