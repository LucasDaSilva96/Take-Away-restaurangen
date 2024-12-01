import MenuItemBox from '@/components/Dashboard/MenuItemBox';
import { Menu_Get } from '@/types/menu';
import { getMenu } from '@/util/menu';
import Link from 'next/link';

export default async function MenuPage() {
  let menuItems: Menu_Get[] = [];
  try {
    menuItems = await getMenu();
  } catch (error) {
    console.error(error);
  }

  if (menuItems.length === 0) {
    return (
      <section className='text-black w-full h-full flex flex-col items-center gap-2'>
        <h1 className='text-2xl'>No menu items available</h1>
        <Link
          href='/dashboard/menu/create'
          className='bg-main-secondary p-2 rounded-md'
        >
          <p className='text-main-primary font-bold'>Create a new menu item</p>
        </Link>
      </section>
    );
  }

  return (
    <section className='w-full h-full flex flex-col gap-2 p-2'>
      <Link
        href='/dashboard/menu/create'
        className='max-w-[200px] bg-main-primary rounded-md'
      >
        <p className='p-2 rounded-md text-main-secondary font-bold'>
          Create a new menu item
        </p>
      </Link>
      <div className='w-full h-full flex flex-col gap-2 max-h-[70dvh] overflow-y-auto'>
        {menuItems.map((item) => (
          <MenuItemBox key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}
