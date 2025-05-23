'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { loginSchema, LoginSchemaType } from '@/schemas/login.schema';
import { postLogin } from '@/actions/login.actions';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Toast } from '../atoms/toast';
import { Pages } from '@/enum/pages.enum';
import { Loader } from 'lucide-react';

export default function FormsLogin() {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  const form = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
    mode: 'all',
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginSchemaType) => {
    setLoading(true);

    if (loading) {
      Toast({
        description: 'Aguarde enquanto estamos processando seu login',
        variant: 'loading',
      });
    }

    const response = await postLogin({ data });

    if (response.success) {
      Toast({
        variant: 'success',
        description: 'Login realizado com sucesso',
      });

      setLoading(false);
      router.push(Pages.HOME_AUTH);
    } else {
      Toast({
        variant: 'error',
        description: response.message,
      });
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='flex w-full flex-col items-center gap-10'
      >
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem className='flex w-fit flex-col'>
              <FormLabel>Email</FormLabel>
              <FormControl className='w-full'>
                <Input
                  type='email'
                  placeholder='Ex: johndoe@example.com'
                  {...field}
                  className='text-black'
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem className='flex w-fit flex-col'>
              <FormLabel>Password</FormLabel>
              <FormControl className='w-full'>
                <Input type='password' placeholder='Ex: abc123' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type='submit'
          className='w-full max-w-60 self-center'
          disabled={loading}
          variant={loading ? 'loading' : 'default'}
        >
          {loading ? <Loader className='h-5 w-5 animate-spin' /> : 'submit'}
        </Button>
      </form>
    </Form>
  );
}
