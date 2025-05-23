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
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Toast } from '../atoms/toast';
import { registerSchema, RegisterSchemaType } from '@/schemas/register.schema';
import { Pages } from '@/enum/pages.enum';
import { postRegister } from '@/actions/register.actions';
import { Loader } from 'lucide-react';

export default function FormsRegister() {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  const form = useForm<RegisterSchemaType>({
    resolver: zodResolver(registerSchema),
    mode: 'all',
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      RG: '',
      phone: '',
      address: '',
      birth_date: new Date(),
      role: 'USER',
    },
  });

  const onSubmit = async (data: RegisterSchemaType) => {
    setLoading(true);

    if (loading) {
      Toast({
        description: 'Aguarde enquanto estamos processando seu login',
        variant: 'loading',
      });
    }

    const response = await postRegister({ data });

    if (response.success) {
      Toast({
        variant: 'success',
        description: response.message,
      });
      setLoading(false);
      router.push(Pages.LOGIN);
    } else {
      Toast({
        variant: 'error',
        description: response.error || response.message,
      });
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='flex h-full w-full flex-col items-center gap-10'
      >
        <div className='flex w-full flex-col items-center justify-between gap-10 md:flex-row md:items-start'>
          <div className='flex w-full flex-col items-center gap-10'>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem className='flex w-full flex-col'>
                  <FormLabel>Name</FormLabel>
                  <FormControl className='w-full'>
                    <Input
                      type='text'
                      placeholder='Ex: John Doe'
                      {...field}
                      className='min-w-full text-black'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem className='flex w-full flex-col'>
                  <FormLabel>Email</FormLabel>
                  <FormControl className='w-full'>
                    <Input
                      type='email'
                      placeholder='Ex: johndoe@example.com'
                      {...field}
                      className='min-w-full text-black'
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
                <FormItem className='flex w-full flex-col'>
                  <FormLabel>Password</FormLabel>
                  <FormControl className='w-full'>
                    <Input
                      type='password'
                      placeholder='Ex: abc123'
                      className='min-w-full text-black'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='confirmPassword'
              render={({ field }) => (
                <FormItem className='flex w-full flex-col'>
                  <FormLabel>Confirm your password</FormLabel>
                  <FormControl className='w-full'>
                    <Input
                      type='password'
                      placeholder='Ex: abc123'
                      className='min-w-full text-black'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className='flex w-full flex-col items-center gap-10'>
            <FormField
              control={form.control}
              name='phone'
              render={({ field }) => (
                <FormItem className='flex w-full flex-col'>
                  <FormLabel>Phone:</FormLabel>
                  <FormControl className='w-full'>
                    <Input
                      type='tel'
                      placeholder='Ex: (11) 91234-5678'
                      className='min-w-full text-black'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='RG'
              render={({ field }) => (
                <FormItem className='flex w-full flex-col'>
                  <FormLabel>RG:</FormLabel>
                  <FormControl className='w-full'>
                    <Input
                      type='number'
                      placeholder='Ex: 012345'
                      className='min-w-full text-black'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='address'
              render={({ field }) => (
                <FormItem className='flex w-full flex-col'>
                  <FormLabel>Address:</FormLabel>
                  <FormControl className='w-full'>
                    <Input
                      type='text'
                      placeholder='Ex: Example Street, 123'
                      className='min-w-full text-black'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='birth_date'
              render={({ field }) => (
                <FormItem className='flex w-full flex-col'>
                  <FormLabel>Date of Birth:</FormLabel>
                  <FormControl className='w-full'>
                    <Input
                      type='date'
                      placeholder='Ex: 2000-01-01'
                      className='min-w-full text-black'
                      onBlur={field.onBlur}
                      name={field.name}
                      ref={field.ref}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <Button
          type='submit'
          className='w-full max-w-60 cursor-auto self-center'
          disabled={loading || !form.formState.isValid}
          variant={loading ? 'loading' : 'default'}
        >
          {loading ? <Loader className='h-5 w-5 animate-spin' /> : 'submit'}
        </Button>
      </form>
    </Form>
  );
}
