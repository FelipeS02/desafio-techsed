import { Metadata } from 'next';
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

type Params = Readonly<{
  params: Promise<{ productId: string }>;
}>;

// Use to caching getProductById response
async function getProduct(productId: string) {
  const product = await getProductById(Number(productId));
  return product;
}

export async function generateMetadata({
  params,
}: Readonly<{
  params: Promise<{ productId: string }>;
}>): Promise<Metadata> {
  const query = (await params).productId;
  const product = await getProduct(query);

  if (!product) {
    return {
      title: 'Producto no encontrado',
      description: 'El producto que buscas no existe',
    };
  }

  return {
    title: product.title,
    description: product.description,
    openGraph: {
      // Only in deploy
      title: product.title,
      description: product.description,
      images: [
        {
          url: product.image.src,
          width: 800,
          height: 600,
          alt: product.title,
        },
      ],
    },
  };
}

export default async function ProductDetails({ params }: Params) {
  const query = (await params).productId;
  const product = await getProduct(query);

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
