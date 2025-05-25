import { cn } from '@/lib/utils';
import { Slot } from '@radix-ui/react-slot';
import { cva, VariantProps } from 'class-variance-authority';

const linkVariants = cva(
  'inline-flex font-inter text-base items-center disabled:cursor-none justify-center gap-2 whitespace-nowrap outline-0 focus-visible:underline focus-visible:underline-offset-4 transition-all duration-100',
  {
    variants: {
      variant: {
        default:
          'hover:text-purple-600 focus-visible:text-purple-600 active:text-purple-800 hover:underline hover:underline-offset-2',
        icon: 'rounded-4xl bg-white font-normal text-purple-700 transition-all hover:bg-[#e6e6e6] hover:text-purple-700 hover:no-underline hover:outline-3 focus-visible:no-underline focus-visible:outline-purple-700 active:bg-[#bfbfbf] active:text-purple-700 disabled:bg-purple-600/50',
      },
      size: {
        default: 'px-5 py-2',
        icon: 'size-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

function Link({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<'a'> &
  VariantProps<typeof linkVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : 'a';

  return (
    <Comp
      data-slot='a'
      className={cn(linkVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Link, linkVariants };
