import { z } from 'zod';

import { productSchema } from './product-schema';

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

export type CartItem = z.infer<typeof cartItemSchema>;

export type Cart = z.infer<typeof cartSchema>;
