import Image from 'next/image';
import { notFound } from 'next/navigation';

import ZoomImage from '@/components/ui/zoom-image';
import {
  ItemDescription,
  ItemOldPrice,
  ItemPrice,
  ItemPricePerUnit,
  ItemSKU,
  ItemTitle,
} from '@/components/features/catalog/item/item-parts';
import CartOptions from '@/components/features/product-details/cart-options';

import { formatCurrency } from '@/lib/formatters';
import { getProductById } from '@/lib/products';

export default async function ProductDetails({
  params,
}: Readonly<{
  params: Promise<{ productId: string }>;
}>) {
  const query = (await params).productId;
  const product = await getProductById(Number(query));

  if (!product) return notFound();

  return (
    <main className='grid size-full grid-cols-1 gap-4 md:grid-cols-[1fr_minmax(300px,450px)]'>
      <div className='col-span-1 flex h-fit flex-col-reverse gap-3 pb-6 md:flex-row'>
        <div
          className='flex shrink-0 flex-row md:flex-col'
          id='product-gallery'
        >
          <Image
            src={product.image}
            className='aspect-square size-20 rounded-md border-2 border-brand p-2'
            alt='product-thumbnail'
          />
        </div>
        <ZoomImage
          src={product.image.src}
          srcZoom={product.image.src}
          alt={product.title}
          className='aspect-square w-2/3 md:w-[50%]'
          containerClassName='h-[500px] w-full flex items-center justify-center bg-contain bg-center bg-no-repeat bg-logo'
        />
      </div>

      <div
        className='col-span-1 flex flex-col gap-8 md:border-l md:px-6'
        id='test'
      >
        <div className='flex flex-col gap-4'>
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

        <CartOptions product={product} />
      </div>
    </main>
  );
}
