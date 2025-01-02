import { z } from 'zod';

import { productSchema } from './product';

export const cartItemSchema = z.object({
  product: productSchema,
  quantity: z.number(),
});

export const cartSchema = z.object({
  id: z.number(),
  items: z.array(cartItemSchema),
  // Transform to isoString to make it serializable
  createdAt: z.date().transform((date) => date.toISOString()),
});
