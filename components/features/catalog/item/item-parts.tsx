import * as React from 'react';
import Image from 'next/image';

import { formatCurrency } from '@/lib/formatters';
import { cn, getPercentageDifference } from '@/lib/utils';
import { type Product } from '@/models/product';

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
      className={cn('text-pretty text-xl font-semibold', className)}
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
      className={cn('text-balance text-foreground-secondary', className)}
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
      className={cn('-ml-px inline-flex items-center gap-2', className)}
      ref={ref}
      {...rest}
    >
      <span className='text-2xl font-semibold' id='price'>
        {formatCurrency(price)}
      </span>
      {discount ? (
        <span className='text-sm text-brand' id='discount-percent'>
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
      className={cn(
        'bg-logo relative aspect-square max-w-full bg-contain bg-center bg-no-repeat [&_img]:rounded-md [&_img]:object-cover [&_img]:drop-shadow',
        className,
      )}
      ref={ref}
      {...rest}
    >
      <Image src={product.image} fill alt={`${product.title}-image`} />
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
