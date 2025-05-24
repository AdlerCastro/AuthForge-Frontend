'use client';

import { UserSchemaType } from '@/schemas/user.schema';
import { ColumnDef } from '@tanstack/react-table';
import { Pencil, Trash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { deleteUser } from '@/actions/deleteUser.actions';
import { Toast } from '@/components/atoms/toast';
import { useSession } from '@/hooks/useSession.hook';

export const usersColumns = (
  refetch: () => void,
): ColumnDef<UserSchemaType>[] => {
  const { session } = useSession();
  const isAdmin = session?.data?.role === 'ADMIN';

  const columns: ColumnDef<UserSchemaType>[] = [
    {
      accessorKey: 'name',
      header: 'Name',
    },
    {
      accessorKey: 'email',
      header: 'Email',
    },
    {
      accessorKey: 'role',
      header: 'Role',
    },
    {
      accessorKey: 'RG',
      header: 'RG',
    },
    {
      accessorKey: 'phone',
      header: 'Phone',
    },
    {
      accessorKey: 'address',
      header: 'Address',
    },
    {
      accessorKey: 'birth_date',
      header: 'Birth Date',
      cell: ({ row }) => {
        const birthDate = new Date(row.original.birth_date);
        return birthDate.toLocaleDateString();
      },
    },
    {
      accessorKey: 'created_at',
      header: 'Created At',
      cell: ({ row }) => {
        const createdAt = new Date(row.original.created_at);
        return createdAt.toLocaleDateString();
      },
    },
  ];

  if (isAdmin) {
    columns.push({
      id: 'actions',
      header: 'Ações',
      cell: ({ row }) => {
        const user = row.original;
        const router = useRouter();

        async function handleEdit() {
          router.push(`/users/${user.id}`);
          refetch();
        }

        async function handleDelete() {
          const response = await deleteUser(user.id);

          Toast({
            description: 'Deletando usuário...',
            variant: 'loading',
          });

          if (response.success) {
            Toast({
              description: 'Usuário deletado com sucesso',
              variant: 'success',
            });
          } else {
            Toast({
              description: response.message,
              variant: 'error',
            });
          }
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
      },
    });
  }

  return columns;
};
