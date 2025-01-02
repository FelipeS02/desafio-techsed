import { render, screen } from '@testing-library/react';

import Bricks from '@/public/images/bricks.webp';

import { CartItems } from './cart';

describe('Cart', () => {
  it('Display list with price', () => {
    const testData = [
      {
        quantity: 1,
        product: {
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
      },
    ];

    render(<CartItems items={testData} />);

    const element = screen.getByTestId('cart-total');

    expect(element).toBeInTheDocument();
  });
});
