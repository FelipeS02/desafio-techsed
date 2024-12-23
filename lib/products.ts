import { z } from 'zod';

import Bricks from '@/public/images/bricks.webp';
import CementBag from '@/public/images/cement-bag.webp';
import Ceramic from '@/public/images/ceramic.webp';
import GypsumBoard from '@/public/images/gypsum-board.webp';
import IronRod from '@/public/images/iron-rod.webp';
import KitchenFaucet from '@/public/images/kitchen-faucet.webp';
import PaintCan from '@/public/images/paint.webp';
import RoofTile from "@/public/images/roof-tile.webp"
import SandBag from '@/public/images/sand-bag.webp';
import TexturedCoating from '@/public/images/textured-coating.webp';
import WoodenBeam from '@/public/images/wooden-beam.webp';

import { Product, productSchema } from '@/schemas/product-schema';

import { timeout } from './utils';

const products = [
  {
    id: 100012,
    title: 'Ladrillo hueco 8cm x 18cm x 33cm (Pallet de 198u)',
    description: 'Ladrillo hueco 8cm x 18cm x 33cm',
    price: 60588,
    listingPrice: 67320,
    stock: 5,
    salesUnit: 'group',
    measurementUnit: 'pallet',
    unitValue: 198,
    image: Bricks,
  },
  {
    id: 2060,
    title: 'Ceramico Azabache 20Und 36X36 1ra 2,68 m2 por Caja',
    description:
      'Cerámica esmaltada 36x36, terminación brillante, transito medio, liso, Colores disponibles: Negro',
    price: 13031,
    stock: 5,
    salesUnit: 'area',
    measurementUnit: 'm2',
    unitValue: 2.68,
    image: Ceramic,
  },
  {
    id: 10035,
    title: 'Hierro 25 mm x 12 m Acindar',
    description: 'HIERRO 25 MM X 12M',
    price: 76293,
    listingPrice: 89757,
    stock: 5,
    salesUnit: 'unit',
    image: IronRod,
  },
  {
    id: 200045,
    title: 'Bolson de arena 1000kg',
    description: 'Bolson de arena para construcción',
    price: 15500,
    stock: 10,
    salesUnit: 'group',
    measurementUnit: 'bolson',
    unitValue: 1000,
    image: SandBag,
  },
  {
    id: 300120,
    title: 'Pintura Látex Blanca 20L',
    description:
      'Pintura látex blanca para interiores y exteriores, cubrimiento de hasta 180m2.',
    price: 42990,
    listingPrice: 47990,
    stock: 8,
    salesUnit: 'unit',
    image: PaintCan,
  },
  {
    id: 401015,
    title: 'Placa de yeso 12.5mm 1.2m x 2.4m',
    description:
      'Placa de yeso estándar de 12.5mm de espesor, ideal para cielorrasos y paredes.',
    price: 2250,
    stock: 50,
    salesUnit: 'unit',
    image: GypsumBoard,
  },
  {
    id: 500001,
    title: 'Cemento Portland x 50kg',
    description:
      'Bolsa de cemento Portland de 50kg, ideal para estructuras y hormigones.',
    price: 2890,
    listingPrice: 3200,
    stock: 25,
    salesUnit: 'group',
    measurementUnit: 'bolson',
    unitValue: 50,
    image: CementBag,
  },
  {
    id: 600056,
    title: 'Revestimiento plástico texturado 25kg',
    description:
      'Revestimiento plástico color blanco texturado, resistente al agua y fácil aplicación.',
    price: 56900,
    stock: 12,
    salesUnit: 'unit',
    image: TexturedCoating,
  },
  {
    id: 700302,
    title: 'Viga de madera 10cm x 5cm x 3m',
    description: 'Viga de madera tratada para exteriores, medidas 10x5x300cm.',
    price: 12990,
    stock: 20,
    salesUnit: 'unit',
    image: WoodenBeam,
  },
  {
    id: 800123,
    title: 'Teja colonial roja (Caja de 20u)',
    description:
      'Caja de 20 tejas coloniales de color rojo, resistentes a la intemperie.',
    price: 15500,
    listingPrice: 16900,
    stock: 15,
    salesUnit: 'group',
    measurementUnit: 'pallet',
    unitValue: 20,
    image: RoofTile,
  },
  {
    id: 900987,
    title: 'Grifería de cocina cromada',
    description:
      'Grifería monocomando de cocina, acabado cromado, diseño moderno y funcional.',
    price: 34990,
    stock: 10,
    salesUnit: 'unit',
    image: KitchenFaucet,
  },
];

export default async function getProducts(): Promise<Product[]> {
  // Simulate api loading
  await timeout(1500);

  return z.array(productSchema).parse(products);
}
