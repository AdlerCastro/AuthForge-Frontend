import { getUser } from '@/actions/getUser.actions';
import { ButtonRouter } from '@/components/atoms/buttonRouter';
import { Container } from '@/components/atoms/container';
import FormsUpdate from '@/components/organisms/formUpdate';

export default async function EditUser({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const data = await getUser(id);
  const user = data.data;

  return (
    <div className='flex h-full w-full justify-center'>
      <Container>
        <ButtonRouter variant='previous' />
        <h1 className='text-2xl font-bold'>Edição do usuário: {user.name}</h1>

        <FormsUpdate {...user} />
      </Container>
    </div>
  );
}
