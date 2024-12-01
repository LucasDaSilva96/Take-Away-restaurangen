import InventoryCard from '@/components/Dashboard/InventoryCard';
import { Menu_Get } from '@/types/menu';
import { getMenu } from '@/util/menu';
import React from 'react';
export default async function InventoryPage() {
  let items: Menu_Get[] = [];
  try {
    items = await getMenu();
  } catch (error) {
    console.error(error);
  }

  if (items.length === 0) {
    return (
      <section className='w-full h-full flex items-center justify-center'>
        No items found
      </section>
    );
  }

  return (
    <section className='w-full h-full flex flex-col gap-4'>
      <h1 className='text-2xl font-mono text-center text-main-primary uppercase'>
        Inventory Page
      </h1>
      <div className='w-full max-h-[70dvh] h-full overscroll-y-auto flex gap-4 flex-wrap p-2'>
        {items.map((item) => (
          <InventoryCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}
