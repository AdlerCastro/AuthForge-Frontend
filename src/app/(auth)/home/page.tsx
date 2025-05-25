'use client';

import { Container } from '@/components/atoms/container';
import { useSession } from '@/hooks/useSession.hook';

export default function Home() {
  const { session, isLoading, isError } = useSession();

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

  if (isError || !session) {
    return (
      <div className='flex h-full w-full flex-col items-center justify-center text-center'>
        <Container className='gap-4'>
          <h1 className='mb-2 text-4xl font-bold'>Erro ao carregar sessão</h1>
          <p className='text-lg italic'>
            Ocorreu um erro ao carregar a sessão. {session?.message}
          </p>
        </Container>
      </div>
    );
  }

  const { name, email, role } = session.data;

  return (
    <div className='flex min-h-full w-full flex-col items-center justify-center text-center'>
      <Container className='gap-4'>
        <h1 className='mb-2 text-4xl font-bold'>Bem-vindo, {name}</h1>
        <p className='text-lg'>Você está autenticado com sucesso.</p>
        <p className='text-muted-foreground text-base'>Seu e-mail: {email}</p>
        <p className='text-muted-foreground text-base'>Seu cargo: {role}</p>
        <p className='text-muted-foreground mt-6 text-center text-base italic'>
          Outras páginas? Elas ainda não apareceram... <br />
          Mas acredite — quando surgirem, não será por acaso. <br />
          Algo está sendo preparado nos bastidores.
        </p>
      </Container>
    </div>
  );
}
