import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex font-inter text-base items-center justify-center gap-2 whitespace-nowrap cursor-pointer outline-0 focus-visible:outline-3',
  {
    variants: {
      variant: {
        default:
          'rounded-4xl bg-purple-600 font-normal text-white transition-all hover:bg-purple-700 focus-visible:outline-white active:bg-purple-800 disabled:bg-purple-600/60',
        outline:
          'rounded-4xl bg-white font-normal text-purple-700 transition-all hover:bg-[#e6e6e6] hover:outline-3 focus-visible:outline-purple-700 active:bg-[#bfbfbf] disabled:bg-purple-600/60',
        link: 'text-primary underline-offset-4 hover:underline',
        comeBack:
          'group rounded-full self-start text-white/60 ring-2 ring-white/60 transition-all hover:ring-white focus-visible:ring-white focus-visible:outline-offset-4 focus-visible:outline-purple-600 active:ring-white/80',
      },
      size: {
        default: 'px-5 py-2',
        comeBack: 'p-2',
        icon: 'size-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : 'button';

  return (
    <Comp
      data-slot='button'
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
