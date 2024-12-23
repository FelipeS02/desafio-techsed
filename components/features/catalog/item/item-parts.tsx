import * as React from 'react';
import Image from 'next/image';

import BgLogo from '@/public/icons/bg-logo.svg';

import { formatCurrency } from '@/lib/formatters';
import { cn, getPercentageDifference } from '@/lib/utils';

import { Product } from '@/schemas/product-schema';

export type ItemBaseProps<T> = React.HTMLAttributes<T> & {
  product: Product;
};

const ItemSKU = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement>
>(({ className = '', ...rest }, ref) => {
  return (
    <span
      className={cn('text-xs leading-none text-foreground-tertiary', className)}
      ref={ref}
      {...rest}
    />
  );
});
ItemSKU.displayName = 'ItemSKU';

const ItemTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className = '', ...rest }, ref) => {
  return (
    <h1
      className={cn('text-xl font-semibold text-pretty', className)}
      ref={ref}
      {...rest}
    />
  );
});
ItemTitle.displayName = 'ItemTitle';

const ItemDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className = '', ...rest }, ref) => {
  return (
    <p
      className={cn('text-foreground-secondary text-balance', className)}
      ref={ref}
      {...rest}
    />
  );
});

ItemDescription.displayName = 'ItemDescription';

const ItemPrice = React.forwardRef<
  HTMLDivElement,
  ItemBaseProps<HTMLDivElement>
>(({ product, className = '', ...rest }, ref) => {
  const { listingPrice = 0, price, discount } = product;

  return (
    <div
      className={cn('inline-flex items-center gap-2 -ml-px', className)}
      ref={ref}
      {...rest}
    >
      <span className='text-2xl font-semibold' id='price'>
        {formatCurrency(price)}
      </span>
      {discount ? (
        <span className='text-sm text-blue-600' id='discount-percent'>
          {getPercentageDifference(listingPrice, price)}% OFF
        </span>
      ) : null}
    </div>
  );
});
ItemPrice.displayName = 'ItemPrice';

const ItemOldPrice = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className = '', children, ...rest }, ref) => {
  return (
    <div className={className} ref={ref} {...rest}>
      <s
        className='text-sm leading-none text-foreground-tertiary'
        aria-hidden='true'
      >
        {children}
      </s>
    </div>
  );
});
ItemOldPrice.displayName = 'ItemOldPrice';

const ItemPricePerUnit = React.forwardRef<
  HTMLParagraphElement,
  ItemBaseProps<HTMLParagraphElement>
>(({ product: p, className = '', ...rest }, ref) => {
  if (p.salesUnit !== 'group') return null;

  return (
    <p
      className={cn('text-foreground-secondary', className)}
      ref={ref}
      {...rest}
    >
      El precio por unidad es de {formatCurrency(p.price / (p?.unitValue ?? 1))}
    </p>
  );
});

ItemPricePerUnit.displayName = 'ItemPricePerUnit';

const ItemImage = React.forwardRef<
  HTMLDivElement,
  ItemBaseProps<HTMLDivElement>
>(({ className = '', product, ...rest }, ref) => {
  return (
    <div
      className={cn('relative aspect-square [&_img]:rounded-md bg-contain [&_img]:drop-shadow [&_img]:object-cover', className)}
      ref={ref}
      style={{ backgroundImage: `url(${BgLogo.src})` }}
      {...rest}
    >
      <Image
        src={product.image}
        fill
        alt={`${product.title}-image`}
      />
    </div>
  );
});
ItemImage.displayName = 'ItemImage';

export {
  ItemImage,
  ItemPrice,
  ItemOldPrice,
  ItemDescription,
  ItemPricePerUnit,
  ItemSKU,
  ItemTitle,
};
