'use client';

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarImage } from '../ui/avatar';
import Default from 'public/assets/images/default.png';
import { Link } from './link';
import { Pages } from '@/enum/pages.enum';
import { logout } from '@/actions/logout.actions';
import { Toast } from './toast';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const ButtonProfile = () => {
  const router = useRouter();

  async function handleSignOut() {
    Toast({
      description: 'Logging out...',
      variant: 'loading',
    });

    const response = await logout();

    if (response.success) {
      Toast({
        description: response.message,
        variant: 'success',
      });

      router.push(Pages.LOGIN);
    } else {
      Toast({
        description: response.message,
        variant: 'error',
      });
    }
  }

  return (
    <DropdownMenu>
      <Avatar asChild className='size-10 cursor-pointer'>
        <DropdownMenuTrigger className='rounded-full hover:outline-2 hover:outline-purple-600 focus-visible:outline-2 focus-visible:outline-purple-600'>
          <AvatarImage src={Default.src} />
        </DropdownMenuTrigger>
      </Avatar>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link
            href={Pages.PROFILE}
            className='w-full justify-start px-0 py-0 text-sm'
          >
            Profile
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem variant='destructive'>
          <span className='w-full' onClick={() => handleSignOut()}>
            Sign out
          </span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export { ButtonProfile };
