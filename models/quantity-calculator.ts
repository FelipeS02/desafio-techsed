export type QuantityCalculatorType = 'primary' | 'secondary';

export type QuantityCalculatorChange = (
  value: number,
  type: QuantityCalculatorType,
) => void;

export type QuantityCalculatorValues = Record<QuantityCalculatorType, number>;
