'use client';

import { Header } from '@/components/molecules/header';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Header />
      <main className='bg-primary_100 flex min-h-screen w-full justify-center pt-20'>
        {children}
      </main>
    </QueryClientProvider>
  );
}
