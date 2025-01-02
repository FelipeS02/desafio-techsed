import { act, renderHook } from '@testing-library/react';

import useItemQuantityCalculator from '../use-item-quantity-calculator';

describe('useItemQuantityCalculator', () => {
  const mockCallback = jest.fn();

  beforeEach(() => {
    mockCallback.mockClear();
  });

  // Test for group-based product (Bricks)
  describe('Group-based product (Pallet)', () => {
    const bricksProduct = {
      id: 100012,
      title: 'Ladrillo hueco 8cm x 18cm x 33cm (Pallet de 198u)',
      salesUnit: 'group',
      measurementUnit: 'pallet',
      unitValue: 198,
    };

    it('should calculate secondary value (units) when primary value (pallets) changes', () => {
      const { result } = renderHook(() =>
        useItemQuantityCalculator(bricksProduct, mockCallback),
      );

      act(() => {
        result.current[1](2, 'primary'); // 2 pallets
      });

      expect(result.current[0]).toEqual({
        primary: 2,
        secondary: 396, // 2 * 198 units
      });
      expect(mockCallback).toHaveBeenCalledWith(2);
    });

    it('should calculate primary value (pallets) when secondary value (units) changes', () => {
      const { result } = renderHook(() =>
        useItemQuantityCalculator(bricksProduct, mockCallback),
      );

      act(() => {
        result.current[1](300, 'secondary'); // 300 units
      });

      expect(result.current[0]).toEqual({
        primary: 2, // Rounds up to 2 pallets
        secondary: 300,
      });
      expect(mockCallback).toHaveBeenCalledWith(2);
    });
  });

  // Test for area-based product (Ceramic)
  describe('Area-based product (Ceramic)', () => {
    const ceramicProduct = {
      id: 2060,
      title: 'Ceramico Azabache 20Und 36X36',
      salesUnit: 'area',
      measurementUnit: 'm2',
      unitValue: 2.68,
    };

    it('should calculate secondary value (boxes) when primary value (m2) changes', () => {
      const { result } = renderHook(() =>
        useItemQuantityCalculator(ceramicProduct, mockCallback),
      );

      act(() => {
        result.current[1](4, 'primary'); // 4 m2
      });

      expect(result.current[0]).toEqual({
        primary: 4,
        secondary: 2, // Rounds up to 2 boxes to cover 4 m2
      });
      expect(mockCallback).toHaveBeenCalledWith(2);
    });

    it('should calculate primary value (m2) when secondary value (boxes) changes', () => {
      const { result } = renderHook(() =>
        useItemQuantityCalculator(ceramicProduct, mockCallback),
      );

      act(() => {
        result.current[1](2, 'secondary'); // 2 boxes
      });

      expect(result.current[0]).toEqual({
        primary: 5.36, // 2 boxes * 2.68 m2
        secondary: 2,
      });
      expect(mockCallback).toHaveBeenCalledWith(2);
    });
  });

  // Test for unit-based product (Iron Rod)
  describe('Unit-based product (Iron Rod)', () => {
    const ironRodProduct = {
      id: 10035,
      title: 'Hierro 25 mm x 12 m Acindar',
      salesUnit: 'unit',
    };

    it('should keep same value for both primary and secondary', () => {
      const { result } = renderHook(() =>
        useItemQuantityCalculator(ironRodProduct, mockCallback),
      );

      act(() => {
        result.current[1](3, 'primary');
      });

      expect(result.current[0]).toEqual({
        primary: 3,
        secondary: 3,
      });
      expect(mockCallback).toHaveBeenCalledWith(3);
    });

    it('should handle secondary input same as primary', () => {
      const { result } = renderHook(() =>
        useItemQuantityCalculator(ironRodProduct, mockCallback),
      );

      act(() => {
        result.current[1](3, 'secondary');
      });

      expect(result.current[0]).toEqual({
        primary: 3,
        secondary: 3,
      });
      expect(mockCallback).toHaveBeenCalledWith(3);
    });
  });

  describe('Error handling', () => {
    it('should throw error for invalid input type', () => {
      const { result } = renderHook(() =>
        useItemQuantityCalculator(
          {
            id: 1,
            title: 'Test Product',
            salesUnit: 'unit',
          },
          mockCallback,
        ),
      );

      expect(() => {
        result.current[1](1, 'invalid');
      }).toThrow('Type must be "primary" or "secondary"');
    });
  });
});
