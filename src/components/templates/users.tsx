'use client';

import { DataTable } from '@/app/(auth)/users/components/dataTable';
import { getUsersColumns } from '@/app/(auth)/users/components/users.columns';
import { useSession } from '@/hooks/useSession.hook';
import { UserListResponse } from '@/types/responseUser.type';

interface UsersPageProps {
  data: UserListResponse;
  refetch: () => void;
}

export default function UsersPage({ data, refetch }: UsersPageProps) {
  const { session } = useSession();

  if (data.success === false) {
    return (
      <p className='text-red-500'>
        Erro ao buscar usuários. Erro {data.message}
      </p>
    );
  }
  if (!session?.success) {
    return <p className='text-red-500'>Erro ao buscar a sessão</p>;
  }

  const columns = getUsersColumns(session.data.role, refetch);

  return (
    <div className='flex h-full w-full justify-center'>
      <DataTable columns={columns} data={data.data} />
    </div>
  );
}
