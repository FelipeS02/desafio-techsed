import { StaticImageData } from 'next/image';

import { z } from 'zod';

// Base properties common to all products
const baseProductSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  price: z.number(),
  listingPrice: z.number().optional(),
  stock: z.number(),
  salesUnit: z.enum(['group', 'unit', 'area']),
  image: z.custom<StaticImageData>(),
  discount: z.boolean().optional(),
});

// Define the discriminated union for specific cases
const multipleUnitSchema = z.object({
  salesUnit: z.enum(['area', 'group']),
  measurementUnit: z.enum(['m2', 'm', 'pallet', 'bolson']),
  unitValue: z.number(),
});

const unitSchema = z.object({
  salesUnit: z.literal('unit'),
  measurementUnit: z.never().optional(),
  unitValue: z.never().optional(),
});

// Combine the schemas
export const productSchema = z
  .union([
    baseProductSchema.merge(multipleUnitSchema),
    baseProductSchema.merge(unitSchema),
  ])
  // If listing price and price is present it means product is on discount
  .transform((p) => ({ ...p, discount: !!p.listingPrice && !!p.price }));

