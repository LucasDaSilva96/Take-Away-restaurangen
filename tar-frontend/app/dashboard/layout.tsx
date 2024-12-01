import Navigation from '@/components/Dashboard/Navigation';

// This is for the revalidation of the page, it will revalidate the page after 1 second
export const revalidate = 1;

export default function DashLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className={`bg-main-light w-full h-screen flex flex-col`}>
      <header className='bg-main-secondary w-full h-20 p-2 text-main-primary font-motter hidden lg:block'>
        <aside className='w-44 h-full flex items-center justify-center flex-col uppercase -space-y-1'>
          <h1 className='flex flex-col -space-y-2 text-lg'>
            <span>Lucky</span>
            <span>Folks</span>
          </h1>
          <p className='text-xs font-alumni'>
            <span>eat</span>
            <span>*</span>
            <span>drink</span>
            <span>*</span>
            <span>relax</span>
          </p>
        </aside>
      </header>

      <div className='w-full h-full flex flex-col lg:flex-row'>
        <aside className='min-w-[250px] bg-main-moss py-4 flex flex-col'>
          <Navigation />
        </aside>
        <div className='p-2 h-full w-full max-h-[85dvh] overflow-y-auto'>
          {children}
        </div>
      </div>
    </section>
  );
}
