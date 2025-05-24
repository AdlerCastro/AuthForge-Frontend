'use client';

import { getUsers } from '@/actions/getUsers.actions';
import { Container } from '@/components/atoms/container';
import UsersPage from '@/components/templates/users';
import { useQuery } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';

export default function Users() {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['users'],
    queryFn: getUsers,
  });

  return (
    <div className='flex h-full w-full justify-center'>
      <Container className='max-w-[1360px]'>
        {isLoading && (
          <div className='flex h-full w-full items-center justify-center'>
            <Loader2 className='mr-2 h-6 w-6 animate-spin' />
            <p>Carregando usuários...</p>
          </div>
        )}

        {!isLoading &&
          (isError ? (
            <p className='text-red-500'>Erro ao buscar usuários.</p>
          ) : (
            <UsersPage
              data={data ?? { data: [], success: false, message: '' }}
              refetch={refetch}
            />
          ))}
      </Container>
    </div>
  );
}
