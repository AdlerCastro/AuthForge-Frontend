'use client';

import { UserSchemaType } from '@/schemas/user.schema';
import { ColumnDef } from '@tanstack/react-table';
import { UserActionsCell } from './userActionsCells';

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
      cell: ({ row }) => (
        <UserActionsCell user={row.original} refetch={refetch} />
      ),
    });
  }

  return columns;
}
