'use client';

import { UserSchemaType } from '@/schemas/user.schema';
import { ColumnDef } from '@tanstack/react-table';
import { UserActionsCell } from './userActionsCells';
import { Link } from '@/components/atoms/link';

export function getUsersColumns(
  role: 'ADMIN' | 'USER',
  refetch: () => void,
): ColumnDef<UserSchemaType>[] {
  const columns: ColumnDef<UserSchemaType>[] = [
    { accessorKey: 'RG', header: 'RG' },
    {
      accessorKey: 'name',
      header: 'Name',
      cell: ({ row }) => (
        <Link href={`/users/${row.original.id}`} className='text-sm'>
          {row.original.name}
        </Link>
      ),
    },
    { accessorKey: 'email', header: 'Email' },
    { accessorKey: 'role', header: 'Role' },
    { accessorKey: 'phone', header: 'Phone' },
    {
      accessorKey: 'birth_date',
      header: 'Birth Date',
      cell: ({ row }) => new Date(row.original.birth_date).toLocaleDateString(),
    },
  ];

  if (role === 'ADMIN') {
    columns.push({
      id: 'actions',
      header: 'Ações',
      cell: ({ row }) => (
        <UserActionsCell user={row.original} refetch={refetch} />
      ),
    });
  }

  return columns;
}
