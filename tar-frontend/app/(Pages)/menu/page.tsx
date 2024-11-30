'use client';

import Menuloop from '@/components/Menu/Menuloop';
import Hero from '@/components/shared/Hero';
import { Menu_Get } from '@/types/menu';
import { getMenu } from '@/util/menu';
import React, { useEffect, useState } from 'react';

const Page = () => {
  const title = ['Explore.', 'Discover.', 'Experience.'];

  const [menuItems, setMenuItems] = useState<Menu_Get[]>([]);

  useEffect(() => {
    const fetchMenuItems = async () => {
      const items = await getMenu();
      setMenuItems(items);
    };

    fetchMenuItems();
  }, []);

  return (
    <>
      <Hero
        title={title}
        description='Try something new'
        video='https://www.luckyfolks.fr/wp-content/uploads/2022/03/lucky-folks-pub-2021-v2-1.mp4'
      />
      <section className='w-screen min-h-screen flex flex-col p-6 pt-20 bg-main-secondaryLight'>
        <section className='w-full flex justify-center items-center text-center'>
          <h3 className='font-motter text-4xl md:text-5xl lg:text-6xl text-main-primary'>
            The Menu
          </h3>
        </section>

        <section className='w-full flex justify-center items-center'>
          {/* Filter */}
          {menuItems && <Menuloop menu={menuItems} />}
        </section>
      </section>
    </>
  );
};

export default Page;
