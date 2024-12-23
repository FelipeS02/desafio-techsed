import { formatCurrency } from '../formatters';

const validOuputRegex = /^\$\s?\d{1,3}(\.\d{3})*$/;

describe('Formaters', () => {
  it('Parser throws when input is invalid', () => {
    expect(() => formatCurrency('test')).toThrow(TypeError);
  });

  it('Parser return valid format', () => {
    expect(validOuputRegex.test(formatCurrency(12355))).toBeTruthy();
  });
});
