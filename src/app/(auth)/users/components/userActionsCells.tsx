'use client';

import { Pencil, Trash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { deleteUser } from '@/actions/deleteUser.actions';
import { Toast } from '@/components/atoms/toast';
import { UserSchemaType } from '@/schemas/user.schema';

interface UserActionsCellProps {
  user: UserSchemaType;
  refetch: () => void;
}

export function UserActionsCell({ user, refetch }: UserActionsCellProps) {
  const router = useRouter();

  async function handleEdit() {
    router.push(`/users/${user.id}`);
    refetch();
  }

  async function handleDelete() {
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
    <div className='flex gap-2'>
      <Button size='icon' variant='outline' onClick={handleEdit}>
        <Pencil className='h-4 w-4' />
      </Button>
      <Button size='icon' variant='outline' onClick={handleDelete}>
        <Trash className='h-4 w-4' />
      </Button>
    </div>
  );
}
