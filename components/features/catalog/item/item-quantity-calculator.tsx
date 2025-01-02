'use client';

import { FC, forwardRef } from 'react';

import { MoveRight } from 'lucide-react';

import { inputStyles } from '@/components/ui/input';
import {
  NumberField,
  NumberFieldDecrement,
  NumberFieldIncrement,
  NumberFieldInput,
  NumberFieldProps,
} from '@/components/ui/number-field';

import { cn } from '@/lib/utils';
import { getQuantityCalculatorMax } from '@/hooks/use-item-quantity-calculator';
import {
  QuantityCalculatorChange,
  QuantityCalculatorType,
  QuantityCalculatorValues,
} from '@/models/quantity-calculator';

import { ItemBaseProps } from './item-parts';

export type ItemQuantityCalculatorProps = Omit<
  ItemBaseProps<HTMLDivElement>,
  'onChange'
> & {
  onChange: QuantityCalculatorChange;
  values: QuantityCalculatorValues;
};

type QuantityInputProps = {
  hideButtons?: boolean;
  unitPlaceholder?: string;
  onValueChange?: QuantityCalculatorChange;
  type: QuantityCalculatorType;
  values: QuantityCalculatorValues;
} & Omit<NumberFieldProps, 'onValueChange' | 'values'>;

const QuantityInput: FC<QuantityInputProps> = ({
  hideButtons = false,
  unitPlaceholder = '',
  onValueChange = () => undefined,
  type,
  values,
  min = 0,
  ...rest
}) => (
  <NumberField
    onValueChange={(v) =>
      typeof v === 'number' ? onValueChange(v, type) : undefined
    }
    min={min}
    value={values[type]}
    {...rest}
  >
    {!hideButtons ? <NumberFieldDecrement /> : null}

    <div
      className={cn(
        inputStyles,
        'items-center p-0',
        hideButtons ? 'rounded-md' : '',
      )}
    >
      <NumberFieldInput className='peer border-0' />
      {unitPlaceholder ? (
        <span className='mx-1 leading-none text-foreground-tertiary transition-colors group-focus:text-foreground-secondary peer-focus-visible:text-foreground-secondary select-none'>
          {unitPlaceholder}
        </span>
      ) : null}
    </div>

    {!hideButtons ? <NumberFieldIncrement /> : null}
  </NumberField>
);

const ItemQuantityCalculator = forwardRef<
  HTMLDivElement,
  ItemQuantityCalculatorProps
>(({ product, onChange, className = '', values }, ref) => {
  const { primary: primaryMax, secondary: secondaryMax } =
    getQuantityCalculatorMax(product);

  const baseProps = {
    onValueChange: onChange,
    values: values,
  };

  const propsByType: Record<QuantityCalculatorType, QuantityInputProps> = {
    primary: {
      ...baseProps,
      type: 'primary',
      max: primaryMax,
      unitPlaceholder: product.measurementUnit,
    },
    secondary: {
      ...baseProps,
      type: 'secondary',
      max: secondaryMax,
      unitPlaceholder: 'U',
    },
  };

  if (product.salesUnit === 'area') {
    return (
      <div className={cn('inline-flex w-10/12 items-center gap-3')} ref={ref}>
        <QuantityInput
          hideButtons
          className='flex-grow'
          {...propsByType['primary']}
        />

        <MoveRight className='size-3 shrink-0 text-foreground-tertiary' />

        <QuantityInput className='flex-grow' {...propsByType['secondary']} />
      </div>
    );
  }

  if (product.salesUnit === 'group')
    return (
      <div
        className={cn('inline-flex w-full items-center gap-3', className)}
        ref={ref}
      >
        <QuantityInput {...propsByType['primary']} />

        <MoveRight className='size-3 shrink-0 text-foreground-tertiary' />

        <QuantityInput {...propsByType['secondary']} />
      </div>
    );

  return (
    <QuantityInput
      {...propsByType['primary']}
      unitPlaceholder='U'
      className={cn('max-w-[40%]', className)}
      ref={ref}
    />
  );
});

ItemQuantityCalculator.displayName = 'ItemQuantityCalculator';

export default ItemQuantityCalculator;
