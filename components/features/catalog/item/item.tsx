import React, { FC, HTMLAttributes } from 'react';
import Link from 'next/link';

import { formatCurrency } from '@/lib/formatters';
import { cn } from '@/lib/utils';
import { type Product } from '@/models/product';

import {
  ItemDescription,
  ItemImage,
  ItemOldPrice,
  ItemPrice,
  ItemPricePerUnit,
  ItemSKU,
  ItemTitle,
} from './item-parts';

type ItemProps = HTMLAttributes<HTMLDivElement> & { product: Product };

const Item: FC<ItemProps> = ({ product, className = '', ...rest }) => {
  return (
    <Link href={`/products/${product.id}`}>
      <article
        className={cn(
          'group/item relative grid h-fit grid-cols-1 grid-rows-[300px_1fr] items-center justify-between gap-6 overflow-hidden rounded-md border p-4',
          className,
        )}
        {...rest}
      >
        <ItemImage
          product={product}
          className='after:text-md m-auto h-full transition-opacity after:absolute after:inset-0 after:z-auto after:flex after:items-center after:justify-center after:bg-black/60 after:font-medium after:text-accent after:opacity-0 after:transition-opacity after:content-["Ver_mas"] group-hover/item:after:opacity-100'
        />

        <div className='flex size-full flex-col justify-between gap-4 border-t'>
          <div className='max-w-[400px]'>
            <ItemSKU>SKU: {product.id}</ItemSKU>
            <ItemTitle>{product.title}</ItemTitle>
            <ItemDescription className='line-clamp-2'>
              {product.description}
            </ItemDescription>
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
      </article>
    </Link>
  );
};

export default Item;
