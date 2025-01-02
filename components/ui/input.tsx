import { forwardRef, InputHTMLAttributes } from 'react';

import { cn } from '@/lib/utils';

export const inputStyles =
  'flex h-7 w-full border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm';

export type InputProps = InputHTMLAttributes<HTMLInputElement>;

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className = '', ...rest }, ref) => {
    return <input className={cn(inputStyles, className)} ref={ref} {...rest} />;
  },
);

Input.displayName = 'Input';

export { Input };
