import { cn } from '@/lib/utils';
import { Link } from '../atoms/link';
import { Pages } from '@/enum/pages.enum';
import { ButtonProfile } from '../atoms/buttonProfile';

export function Header({
  className,
  ...props
}: React.HtmlHTMLAttributes<HTMLDivElement>) {
  return (
    <header
      className={cn(
        'bg-primary-100 shadow-header fixed top-0 z-10 flex h-20 w-full items-center justify-center bg-white px-10 py-4',
        className,
      )}
      {...props}
    >
      <div className='flex w-full max-w-[1280px] flex-row items-center justify-between'>
        <Link href={Pages.HOME_AUTH} className='p-1'>
          <h1 className='animate-pulse text-3xl font-bold text-nowrap'>
            AuthForge
          </h1>
        </Link>
        <nav className='fixed right-1/2 left-1/2 flex items-center justify-center gap-5'>
          <Link href={Pages.USERS}>Usuários</Link>
          <Link href={Pages.ABOUT}>Sobre</Link>
        </nav>
        <ButtonProfile />
      </div>
    </header>
  );
}
