import Catalog from '@/components/features/catalog/catalog';

import { getProducts } from '@/lib/products';

export default async function Home() {
  const products = await getProducts();
  return (
    <main className='grid h-fit w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4'>
      <Catalog products={products} className='col-span-1 h-full w-full' />
    </main>
  );
}
