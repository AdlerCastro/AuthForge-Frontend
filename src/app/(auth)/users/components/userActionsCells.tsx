'use client';

import { Pencil, Trash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { deleteUser } from '@/actions/deleteUser.actions';
import { Toast } from '@/components/atoms/toast';
import { UserSchemaType } from '@/schemas/user.schema';
import { Pages } from '@/enum/pages.enum';
import { Link } from '@/components/atoms/link';

interface UserActionsCellProps {
  currentUser: UserSchemaType;
  user: UserSchemaType;
  refetch: () => void;
}

export function UserActionsCell({
  currentUser,
  user,
  refetch,
}: UserActionsCellProps) {
  const url =
    currentUser.id === user.id
      ? `${Pages.PROFILE}/edit`
      : `/users/${user.id}/edit`;

  async function handleDelete() {
    const isCurrentUser = currentUser.id === user.id;

    if (isCurrentUser) {
      Toast({
        description: 'Você não pode deletar seu próprio usuário',
        variant: 'error',
      });
      return;
    }

    Toast({ description: 'Deletando usuário...', variant: 'loading' });

    const response = await deleteUser(user.id);

    Toast({
      description: response.success
        ? 'Usuário deletado com sucesso'
        : response.message,
      variant: response.success ? 'success' : 'error',
    });

    refetch();
  }

  return (
    <div className='right-0 flex w-full justify-center gap-2'>
      <Link href={url} size={'icon'} variant={'icon'}>
        <Pencil className='h-4 w-4' />
      </Link>

      <Button size='icon' variant='outline' onClick={handleDelete}>
        <Trash className='h-4 w-4' />
      </Button>
    </div>
  );
}
