'use client';

import React, { FC, HTMLAttributes } from 'react';

import { ShoppingCart } from 'lucide-react';

import { Button } from '@/components/ui/button';
import CartShoppingDelete from '@/components/icons/cart-shopping-delete';

import { formatCurrency } from '@/lib/formatters';
import { cn } from '@/lib/utils';
import useCartItem from '@/hooks/use-cart-item';

import { Product } from '@/schemas/product-schema';

import {
  ItemDescription,
  ItemImage,
  ItemOldPrice,
  ItemPrice,
  ItemPricePerUnit,
  ItemSKU,
  ItemTitle,
} from './item-parts';
import ItemQuantitySelector from './item-quantity-selector';

type ItemProps = HTMLAttributes<HTMLDivElement> & { product: Product };

const Item: FC<ItemProps> = ({ product, className = '', ...rest }) => {
  const {
    handleAdd,
    isCartProductEdited,
    itemInCart,
    setQuantity,
    quantity,
    handleDelete,
  } = useCartItem(product);

  return (
    <article
      className={cn(
        'relative grid h-fit grid-cols-1 grid-rows-[300px_1fr] items-center justify-between gap-6 overflow-hidden rounded-md border p-4 shadow-md',
        className,
      )}
      {...rest}
    >
      <ItemImage product={product} className='m-auto h-full' />

      <div className='flex size-full flex-col justify-between gap-4 border-t'>
        <div className='flex flex-col justify-between gap-3'>
          
          <div className='max-w-[400px]'>
            <ItemSKU>SKU: {product.id}</ItemSKU>
            <ItemTitle>{product.title}</ItemTitle>
            <ItemDescription>{product.description}</ItemDescription>
          </div>

          <div>
            {product.discount ? (
              <ItemOldPrice>
                {formatCurrency(product.listingPrice ?? 0)}
              </ItemOldPrice>
            ) : null}
            <ItemPrice product={product} />
            <ItemPricePerUnit product={product} />
          </div>
        </div>
        <div className='flex flex-col gap-2'>
          <ItemQuantitySelector
            onChange={setQuantity}
            value={quantity}
            product={product}
          />

          {itemInCart && !isCartProductEdited ? (
            <Button variant='outline' onClick={handleDelete}>
              <CartShoppingDelete /> Eliminar del carrito
            </Button>
          ) : (
            <Button disabled={quantity === 0} onClick={handleAdd}>
              <ShoppingCart /> Agregar al carrito
            </Button>
          )}
        </div>
      </div>
    </article>
  );
};

export default Item;
