import { FC } from 'react';

import { type Product } from '@/models/product';

import Item from './item/item';

const Catalog: FC<{ products: Product[]; className?: string }> = ({
  products,
  className = '',
}) => {
  return (
    <>
      {products.map((product) => (
        <Item
          className={className}
          product={product}
          key={`catalog-item-${product.id}`}
        />
      ))}
    </>
  );
};

export default Catalog;
