import { cn } from '@/lib/utils';
import { Button } from '../ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const buttonRouterVariants = {
  previous: (className?: string) => (
    <ArrowLeft
      className={cn(
        'h-6 w-6 text-white/60 transition-all group-hover:text-white group-focus-visible:text-white group-active:text-white/80',
        className,
      )}
    />
  ),
  next: (className?: string) => (
    <ArrowRight
      className={cn(
        'h-6 w-6 text-white/60 transition-all group-hover:text-white group-focus-visible:text-white group-active:text-white/80',
        className,
      )}
    />
  ),
};

function ButtonRouter({
  className,
  variant,
  ...props
}: React.ComponentProps<'button'> & {
  variant?: 'previous' | 'next';
}) {
  return (
    <Button
      variant={'comeBack'}
      size={'comeBack'}
      aria-label='Botão para retornar a página anterior'
      {...props}
    >
      {variant === 'previous'
        ? buttonRouterVariants.previous(className)
        : buttonRouterVariants.next(className)}
    </Button>
  );
}

export { ButtonRouter, buttonRouterVariants };
