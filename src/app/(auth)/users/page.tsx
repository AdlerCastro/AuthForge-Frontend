'use client';

import { getUsers } from '@/actions/getUsers.actions';
import { Container } from '@/components/atoms/container';
import UsersPage from '@/components/templates/users';
import { useQuery } from '@tanstack/react-query';

export default function Users() {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['users'],
    queryFn: getUsers,
  });

  if (isLoading) {
    return (
      <div className='flex min-h-full w-full flex-col items-center justify-center text-center'>
        <Container className='gap-4'>
          <h1 className='mb-2 text-4xl font-bold'>Carregando...</h1>
          <p className='text-lg italic'>
            Estamos buscando as informações da sua sessão.
          </p>
          <p className='text-muted-foreground text-base italic'>
            Isso pode levar alguns segundos.
          </p>
        </Container>
      </div>
    );
  }

  if (isError) {
    return (
      <div className='flex h-full w-full flex-col items-center justify-center text-center'>
        <Container className='gap-4'>
          <h1 className='mb-2 text-4xl font-bold'>Erro ao carregar sessão</h1>
          <p className='text-lg italic'>
            Ocorreu um erro ao carregar a sessão. {data?.message}
          </p>
        </Container>
      </div>
    );
  }

  return (
    <div className='flex min-h-full w-full justify-center'>
      <Container className='max-w-[1360px]'>
        <UsersPage
          data={data ?? { data: [], success: false, message: '' }}
          refetch={refetch}
        />
      </Container>
    </div>
  );
}
