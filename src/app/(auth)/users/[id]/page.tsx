import { getUser } from '@/actions/getUser.actions';
import { ButtonRouter } from '@/components/atoms/buttonRouter';
import { Container } from '@/components/atoms/container';

export default async function Users({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const data = await getUser(id);

  return (
    <div className='flex h-full w-full justify-center'>
      <Container>
        <ButtonRouter variant='previous' />
        <h1 className='text-2xl font-bold'>
          Página de visualização do usuário
        </h1>
        <p className='text-muted-foreground text-center text-base text-balance italic'>
          A visualização de usuários ainda não está implementada. Você pode
          visualizar os dados do usuário de forma organizada em breve
        </p>

        <div className='mt-4'>
          <h2 className='text-lg font-semibold'>Dados do Usuário:</h2>
          <pre className='whitespace-pre-wrap'>
            {JSON.stringify(data.data, null, 2)}
          </pre>
        </div>
      </Container>
    </div>
  );
}
