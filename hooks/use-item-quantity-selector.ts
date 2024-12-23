import { useCallback, useMemo, useState } from 'react';

import { NumberFieldProps } from '@/components/ui/number-field';

import { Product } from '@/schemas/product-schema';

export default function useItemQuantitySelector(
  product: Product,
  value: number,
  cb: (value: number) => void,
) {
  const { unitValue = 1, stock, salesUnit } = product;

  const [calcUnitByMeasurement, setCalcUnitByMeasurement] =
    useState<boolean>(true);

  /**
   *
   * @prop {number} value - Current quantity multiplied by measurement values
   * @prop {number} step - Fixed steps to prevent values not being multiples from unitValue
   * @prop {number} max - Max quantity by measurement multiplier
   *
   */
  const propsByUnit = useMemo(() => {
    switch (salesUnit) {
      case 'area': {
        return {
          value: calcUnitByMeasurement ? value * unitValue : value,
          step: calcUnitByMeasurement ? unitValue : 1,
          max: calcUnitByMeasurement ? stock * unitValue : stock,
        };
      }
      case 'group': {
        return {
          value: calcUnitByMeasurement ? value : value * unitValue,
          step: calcUnitByMeasurement ? 1 : unitValue,
          max: calcUnitByMeasurement ? stock : stock * unitValue,
        };
      }
      default: {
        return {
          value,
          step: unitValue,
          max: stock,
        };
      }
    }
  }, [salesUnit, calcUnitByMeasurement, stock, unitValue, value]);

  /**
   * Parsing of the return value from the numerical input where
   * its value attribute is multiplied (or not) by units of measurement
   * to return +1 / -1 in every iteration
   */
  const handleChange = useCallback<
    NonNullable<NumberFieldProps['onValueChange']>
  >(
    (newValue) => {
      if (typeof newValue !== 'number') return;

      switch (salesUnit) {
        case 'group': {
          cb(calcUnitByMeasurement ? newValue : newValue / unitValue);
          break;
        }
        case 'area': {
          cb(calcUnitByMeasurement ? newValue / unitValue : newValue);
          break;
        }
        default: {
          cb(newValue);
          break;
        }
      }
    },
    [cb, calcUnitByMeasurement, unitValue, salesUnit],
  );

  return {
    propsByUnit,
    handleChange,
    calcUnitByMeasurement,
    setCalcUnitByMeasurement,
  };
}
