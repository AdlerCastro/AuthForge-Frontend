'use client';

import { UserSchemaType } from '@/schemas/user.schema';
import { ColumnDef } from '@tanstack/react-table';
import { UserActionsCell } from './userActionsCells';
import { Link } from '@/components/atoms/link';
import { User } from '@/types/user.type';
import { Pages } from '@/enum/pages.enum';

export function getUsersColumns(
  currentUser: User,
  refetch: () => void,
): ColumnDef<UserSchemaType>[] {
  const columns: ColumnDef<UserSchemaType>[] = [
    { accessorKey: 'RG', header: 'RG' },
    {
      accessorKey: 'name',
      header: 'Name',
      cell: ({ row }) => {
        const url =
          currentUser.id === row.original.id
            ? Pages.PROFILE
            : `/users/${row.original.id}`;

        return (
          <Link href={url} className='text-sm'>
            {row.original.name}
          </Link>
        );
      },
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

  if (currentUser.role === 'ADMIN') {
    columns.push({
      id: 'actions',
      header: 'Ações',
      cell: ({ row }) => (
        <UserActionsCell
          currentUser={currentUser}
          user={row.original}
          refetch={refetch}
        />
      ),
    });
  }

  return columns;
}
