export const formatCurrency = (value: number): string => {
  if (typeof value !== 'number') throw TypeError('Value must be a number');

  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    // Disable cents
    minimumFractionDigits: 0,
  }).format(value);
};
