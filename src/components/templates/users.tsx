'use client';

import { UserListResponse } from '@/types/responseUser.type';
import { DataTable } from '@/app/(auth)/users/dataTable';
import { usersColumns } from '@/app/(auth)/users/users.columns';

interface UsersPageProps {
  data: UserListResponse | undefined;
  refetch: () => void;
}

export default function UsersPage({ data, refetch }: UsersPageProps) {
  return (
    <div className='flex h-full w-full justify-center'>
      <DataTable columns={usersColumns(refetch)} data={data?.data ?? []} />
    </div>
  );
}
