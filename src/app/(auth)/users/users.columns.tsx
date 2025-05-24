import { UserSchemaType } from '@/schemas/user.schema';
import { ColumnDef } from '@tanstack/react-table';
import { Pencil, Trash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { deleteUser } from '@/actions/deleteUser.actions';
import { Toast } from '@/components/atoms/toast';
import { useRouter } from 'next/navigation';

export function getUsersColumns(
  role: 'ADMIN' | 'USER',
  refetch: () => void,
): ColumnDef<UserSchemaType>[] {
  const columns: ColumnDef<UserSchemaType>[] = [
    { accessorKey: 'name', header: 'Name' },
    { accessorKey: 'email', header: 'Email' },
    { accessorKey: 'role', header: 'Role' },
    { accessorKey: 'RG', header: 'RG' },
    { accessorKey: 'phone', header: 'Phone' },
    { accessorKey: 'address', header: 'Address' },
    {
      accessorKey: 'birth_date',
      header: 'Birth Date',
      cell: ({ row }) => new Date(row.original.birth_date).toLocaleDateString(),
    },
    {
      accessorKey: 'created_at',
      header: 'Created At',
      cell: ({ row }) => new Date(row.original.created_at).toLocaleDateString(),
    },
  ];

  if (role === 'ADMIN') {
    columns.push({
      id: 'actions',
      header: 'Ações',
      cell: ({ row }) => {
        const router = useRouter();
        const user = row.original;

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
      },
    });
  }

  return columns;
}
