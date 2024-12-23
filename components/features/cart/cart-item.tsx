import { FC, HTMLAttributes } from 'react';

import { cn } from '@/lib/utils';

import { CartItem as CartItemType } from '@/schemas/cart-schema';

import {
  ItemImage,
  ItemPrice,
  ItemSKU,
  ItemTitle,
} from '../catalog/item/item-parts';

type CartItemProps = HTMLAttributes<HTMLDivElement> & { item: CartItemType };

const CartItem: FC<CartItemProps> = ({ item, className = '', ...rest }) => {
  return (
    <article
      className={cn(
        'inline-flex w-full items-center gap-4 border-b py-6',
        className,
      )}
      {...rest}
    >
      <ItemImage product={item.product} className='size-20' />
      <div className='flex flex-col'>
        <ItemSKU>SKU: {item.product.id}</ItemSKU>
        <ItemTitle className='text-base font-normal'>
          {item.product.title}{' '}
          <span className='text-foreground-tertiary'>x{item.quantity}</span>
        </ItemTitle>
        <ItemPrice
          className='mt-1 [&_#price]:text-lg [&_#price]:font-medium'
          product={{
            ...item.product,
            // Apply quantity multiplier in al prices to prevent incorrect discount percentage
            listingPrice: (item.product.listingPrice ?? 0) * item.quantity,
            price: item.product.price * item.quantity,
          }}
        />
      </div>
    </article>
  );
};

export default CartItem;
