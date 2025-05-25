import { getUser } from '@/actions/getUser.actions';
import { Container } from '@/components/atoms/container';

export default async function EditUser({ params }: { params: { id: string } }) {
  const data = await getUser(params.id);

  return (
    <div className='flex h-full w-full justify-center'>
      <Container>
        <h1 className='text-2xl font-bold'>Página de edição de usuários</h1>
        <p className='text-muted-foreground text-center text-base text-balance italic'>
          A edição de usuários ainda não está implementada. Você pode editar os
          dados do usuário de forma organizada em breve.
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
