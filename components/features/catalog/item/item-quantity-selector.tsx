'use client';

import { Dispatch, forwardRef, SetStateAction } from 'react';

import { Separator } from '@base-ui-components/react';

import { Button } from '@/components/ui/button';
import {
  NumberField,
  NumberFieldDecrement,
  NumberFieldGroup,
  NumberFieldIncrement,
  NumberFieldInput,
} from '@/components/ui/number-field';

import { cn } from '@/lib/utils';
import useItemQuantitySelector from '@/hooks/use-item-quantity-selector';

import { ItemBaseProps } from './item-parts';

export type ItemQuantitySelectorProps = Omit<
  ItemBaseProps<HTMLDivElement>,
  'onChange'
> & {
  value: number;
  onChange?: Dispatch<SetStateAction<number>>;
};

const unitSelectedClass =
  'data-[selected=true]:text-blue-600 data-[selected=true]:underline data-[selected=true]:underline-offset-2';

const ItemQuantitySelector = forwardRef<
  HTMLDivElement,
  ItemQuantitySelectorProps
>(({ product, onChange = () => undefined, className = '', value }, ref) => {
  const {
    calcUnitByMeasurement,
    handleChange,
    propsByUnit,
    setCalcUnitByMeasurement,
  } = useItemQuantitySelector(product, value, onChange);

  if (!product) return null;

  return (
    <div className={cn('inline-flex', className)} ref={ref}>
      <NumberField
        onValueChange={handleChange}
        value={propsByUnit.value}
        min={0}
        max={propsByUnit.max}
        step={propsByUnit.step}
        className='col-span-1 w-full'
        id='product-quantity-selector'
      >
        <span>Cantidad:</span>
        <NumberFieldGroup className='items-center gap-1'>
          <div className='inline-flex'>
            <NumberFieldDecrement className='h-7 w-7 flex-shrink-0' />
            <NumberFieldInput className='max-w-14' />
            <NumberFieldIncrement className='h-7 w-7 flex-shrink-0' />
          </div>

          {product.measurementUnit ? (
            <div className='inline-flex items-center' id='unit-selector'>
              <Button
                variant='ghost'
                size='sm'
                onClick={() => setCalcUnitByMeasurement(true)}
                data-selected={calcUnitByMeasurement}
                className={unitSelectedClass}
              >
                {product.measurementUnit}
              </Button>
              <Separator className='h-6 w-px bg-foreground-tertiary' />
              <Button
                variant='ghost'
                size='sm'
                onClick={() => setCalcUnitByMeasurement(false)}
                data-selected={!calcUnitByMeasurement}
                className='data-[selected=true]:text-blue-600'
              >
                unidades
              </Button>
            </div>
          ) : null}
        </NumberFieldGroup>
      </NumberField>
    </div>
  );
});

ItemQuantitySelector.displayName = 'ItemQuantitySelector';

export default ItemQuantitySelector;
