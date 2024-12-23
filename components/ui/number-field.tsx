import { ComponentProps, forwardRef } from 'react';

import { NumberField as NFPrimitive } from '@base-ui-components/react';
import { Minus, MoveHorizontal, Plus } from 'lucide-react';

import { cn } from '@/lib/utils';

import { ButtonProps, buttonVariants } from './button';

export type NumberFieldScrubAreaProps = ComponentProps<
  typeof NFPrimitive.ScrubArea
> & { htmlFor?: string };

const NumberFieldScrubArea = forwardRef<
  HTMLDivElement,
  NumberFieldScrubAreaProps
>(({ htmlFor = '', children, className = '', ...rest }, ref) => {
  return (
    <NFPrimitive.ScrubArea className={cn('', className)} ref={ref} {...rest}>
      <label htmlFor={htmlFor}>{children}</label>
      <NFPrimitive.ScrubAreaCursor>
        <MoveHorizontal />
      </NFPrimitive.ScrubAreaCursor>
    </NFPrimitive.ScrubArea>
  );
});
NumberFieldScrubArea.displayName = 'NumberFieldScrubArea';

export type NumberFieldGroupProps = ComponentProps<typeof NFPrimitive.Group>;

const NumberFieldGroup = forwardRef<HTMLDivElement, NumberFieldGroupProps>(
  ({ children, className = '', ...rest }, ref) => {
    return (
      <NFPrimitive.Group
        className={cn('inline-flex max-w-full', className)}
        ref={ref}
        {...rest}
      >
        {children}
      </NFPrimitive.Group>
    );
  },
);
NumberFieldGroup.displayName = 'NumberFieldGroup';

const NumberFieldDecrement = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'outline', size = 'icon', className = '', ...rest }, ref) => {
    return (
      <NFPrimitive.Decrement
        className={cn(
          buttonVariants({ size, variant }),
          'rounded-r-none',
          className,
        )}
        role='decrement'
        ref={ref}
        {...rest}
      >
        <Minus />
      </NFPrimitive.Decrement>
    );
  },
);
NumberFieldDecrement.displayName = 'NumberFieldDecrement';

const NumberFieldIncrement = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = '', variant = 'outline', size = 'icon', ...rest }, ref) => {
    return (
      <NFPrimitive.Increment
        className={cn(
          buttonVariants({ size, variant }),
          'rounded-l-none',
          className,
        )}
        role="increment"
        ref={ref}
        {...rest}
      >
        <Plus />
      </NFPrimitive.Increment>
    );
  },
);
NumberFieldIncrement.displayName = 'NumberFieldIncrement';

export type NumberFieldInputProps = ComponentProps<typeof NFPrimitive.Input>;

const NumberFieldInput = forwardRef<HTMLInputElement, NumberFieldInputProps>(
  ({ className = '' }, ref) => (
    <NFPrimitive.Input
      className={cn(
        'flex h-7 w-full border-y border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
        className,
      )}
      ref={ref}
    />
  ),
);
NumberFieldInput.displayName = 'NumberFieldInput';

export type NumberFieldProps = ComponentProps<typeof NFPrimitive.Root>;

const NumberField = forwardRef<HTMLDivElement, NumberFieldProps>(
  ({ children, className = '', ...rest }, ref) => {
    return (
      <NFPrimitive.Root
        className={cn('flex flex-col', className)}
        ref={ref}
        {...rest}
      >
        {children}
      </NFPrimitive.Root>
    );
  },
);
NumberField.displayName = 'NumberField';

export {
  NumberField,
  NumberFieldDecrement,
  NumberFieldGroup,
  NumberFieldIncrement,
  NumberFieldScrubArea,
  NumberFieldInput,
};
