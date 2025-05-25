'use client';

import { DataTable } from '@/app/(auth)/users/components/dataTable';
import { getUsersColumns } from '@/app/(auth)/users/components/users.columns';
import { useSession } from '@/hooks/useSession.hook';
import { UserListResponse } from '@/types/responseUser.type';
import { Container } from '../atoms/container';
import { ButtonRouter } from '../atoms/buttonRouter';

interface UsersPageProps {
  data: UserListResponse;
  refetch: () => void;
}

export default function UsersPage({ data, refetch }: UsersPageProps) {
  const { session, isLoading, isError } = useSession();

  if (data.success === false) {
    return (
      <p className='text-red-500'>
        Erro ao buscar usuários. Erro {data.message}
      </p>
    );
  }

  if (isLoading) {
    return (
      <div className='flex min-h-full w-full flex-col items-center justify-center text-center'>
        <Container className='gap-4'>
          <h1 className='mb-2 text-4xl font-bold'>Carregando...</h1>
          <p className='text-lg italic'>Estamos buscando os usuários.</p>
          <p className='text-muted-foreground text-base italic'>
            Isso pode levar alguns segundos.
          </p>
        </Container>
      </div>
    );
  }

  if (isError || !session) {
    return (
      <div className='flex min-h-full w-full flex-col items-center justify-center text-center'>
        <Container className='gap-4'>
          <h1 className='mb-2 text-4xl font-bold'>Erro ao carregar sessão</h1>
          <p className='text-lg italic'>
            Ocorreu um erro ao carregar a sessão. {session?.message}
          </p>
        </Container>
      </div>
    );
  }

  const columns = getUsersColumns(session.data, refetch);

  return (
    <div className='flex h-full w-full flex-col items-center gap-10'>
      <ButtonRouter variant='previous' />
      <DataTable columns={columns} data={data.data} />
    </div>
  );
}
