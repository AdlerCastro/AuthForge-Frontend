export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className='bg-quaternary_100 flex min-h-screen w-full justify-center'>
      {children}
    </main>
  );
}
