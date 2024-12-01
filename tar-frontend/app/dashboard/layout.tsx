import Navigation from "@/components/Dashboard/Navigation";

// This is for the revalidation of the page, it will revalidate the page after 1 second
export const revalidate = 1;

export default function DashLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className={`bg-main-light w-full h-screen flex flex-col`}>
      {/* <div className='z-10 w-64 h-full bg-main-moss'>
        <div className='w-64 h-32 bg-main-secondary border-r-2 border-black flex justify-center items-center '>
          <div className='text-main-primary w-32 text-center '>
            <h1 className='font-motter text-3xl'>LUCKY FOLKS</h1>
            <p className='text-xs'>EAT-DRINK-RELAX</p>
          </div>
        </div>
      </div>

      <header className='bg-main-secondary w-full h-32 fixed'></header>
      <div className=' w-full flex justify-center items-start mt-32 p-6'>
        {children}
      </div> */}

      <header className="bg-main-secondary w-full h-20 p-2 text-main-primary font-motter hidden lg:block">
        <aside className="w-44 h-full flex items-center justify-center flex-col uppercase -space-y-1">
          <h1 className="flex flex-col -space-y-2 text-lg">
            <span>Lucky</span>
            <span>Folks</span>
          </h1>
          <p className="text-xs font-alumni">
            <span>eat</span>
            <span>*</span>
            <span>drink</span>
            <span>*</span>
            <span>relax</span>
          </p>
        </aside>
      </header>

      <div className="w-full h-full flex flex-col lg:flex-row">
        <aside className="min-w-[250px] bg-main-moss py-4">
          <Navigation />
        </aside>
        <div className="p-2 h-full w-full">{children}</div>
      </div>
    </section>
  );
}
