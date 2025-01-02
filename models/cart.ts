import { z } from 'zod';

import { cartItemSchema, cartSchema } from '@/schemas/cart';

export type CartItem = z.infer<typeof cartItemSchema>;

export type Cart = z.infer<typeof cartSchema>;
