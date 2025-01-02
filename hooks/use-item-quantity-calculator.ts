import { useCallback, useState } from 'react';

import { type Product } from '@/models/product';
import {
  QuantityCalculatorChange,
  QuantityCalculatorType,
  QuantityCalculatorValues,
} from '@/models/quantity-calculator';

import { productSchema } from '@/schemas/product';

/**
 *
 * @param product
 * @returns Max attribute for number input based on stock and measurement value
 */
export function getQuantityCalculatorMax(
  product: Product,
): Record<QuantityCalculatorType, number> {
  if (productSchema.safeParse(product).error)
    return { primary: 1, secondary: 1 };

  const { stock, unitValue = 1 } = product;

  switch (product.salesUnit) {
    case 'group': {
      return { primary: stock, secondary: stock * unitValue };
    }

    case 'area': {
      return { primary: stock * unitValue, secondary: stock };
    }

    default: {
      return { primary: product.stock, secondary: product.stock };
    }
  }
}

/**
 * Custom hook to handle quantity calculations for different types of products.
 * Manages bidirectional conversion between primary units (like pallets, m2) and
 * secondary units (individual units, boxes) based on the product's sales unit type.
 *
 * @param product - The product object containing sales unit configuration
 * @param cb - Callback function to handle quantity changes, receives the final calculated value
 * @returns [values, handleChange]
 *   - values: Object containing primary and secondary quantities
 *   - handleChange: Function to update either primary or secondary value
 *
 * Supports three types of products:
 * 1. Group-based (e.g., pallets): Converts between group quantities and individual units
 * 2. Area-based (e.g., m²): Converts between area measurements and product boxes/units
 * 3. Unit-based: Direct one-to-one relationship between primary and secondary values
 */
export default function useItemQuantityCalculator(
  product: Product,
  cb: (value: number) => void,
): [QuantityCalculatorValues, QuantityCalculatorChange] {
  // State to store both primary and secondary quantity values
  const [values, setValues] = useState({
    primary: 0, // Primary unit (pallets, m², units)
    secondary: 0, // Secondary unit (individual units, boxes)
  });

  /**
   * Handles changes in either primary or secondary quantity values.
   * Performs necessary conversions based on product type and updates both values accordingly.
   *
   * @param newValue - The new quantity value entered by user
   * @param type - Which input is being changed ('primary' or 'secondary')
   *
   * Calculation rules:
   * - Group (e.g., pallets):
   *   - Primary to Secondary: multiply by unitValue (1 pallet → 198 units)
   *   - Secondary to Primary: divide by unitValue and round up (300 units → 2 pallets)
   *
   * - Area (e.g., m²):
   *   - Primary to Secondary: divide by unitValue and round up (4m² → 2 boxes)
   *   - Secondary to Primary: multiply by unitValue (2 boxes → 5.36m²)
   *
   * - Unit: both values remain equal (no conversion needed)
   */
  const handleChange = useCallback<QuantityCalculatorChange>(
    (newValue, type) => {
      if (type !== 'primary' && type !== 'secondary')
        throw new Error('Input name is not valid');

      // Handle primary value changes (e.g., number of pallets, m², units)
      if (type === 'primary') {
        setValues(() => {
          switch (product.salesUnit) {
            case 'group': {
              // Convert group quantity to individual units
              // Example: 1 pallet = 198 units
              const groupValueToUnits = newValue * product.unitValue;
              cb(newValue);
              return { primary: newValue, secondary: groupValueToUnits };
            }
            case 'area': {
              // Convert area to required boxes/units
              // Example: 4m² requires 2 boxes (if each box covers 2.68m²)
              // Rounds up to ensure sufficient coverage
              const areaValueToStockUnits = Math.ceil(
                newValue / product.unitValue,
              );
              cb(areaValueToStockUnits);
              return { primary: newValue, secondary: areaValueToStockUnits };
            }
            default: {
              // For unit-based products, both values are the same
              cb(newValue);
              return { primary: newValue, secondary: newValue };
            }
          }
        });
        return;
      }

      // Handle secondary value changes (e.g., individual units, boxes)
      setValues(() => {
        switch (product.salesUnit) {
          case 'group': {
            // Convert individual units to required groups
            // Example: 300 units requires 2 pallets (rounded up)
            const unitValueToGroup = Math.ceil(newValue / product.unitValue);
            cb(unitValueToGroup);
            return { primary: unitValueToGroup, secondary: newValue };
          }
          case 'area': {
            // Convert boxes/units to total area
            // Example: 2 boxes = 5.36m² (if each box is 2.68m²)
            const unitValueToArea = newValue * product.unitValue;
            cb(newValue);
            return { primary: unitValueToArea, secondary: newValue };
          }
          default: {
            // For unit-based products, both values are the same
            cb(newValue);
            return { primary: newValue, secondary: newValue };
          }
        }
      });
    },
    [product, cb],
  );

  return [values, handleChange];
}
