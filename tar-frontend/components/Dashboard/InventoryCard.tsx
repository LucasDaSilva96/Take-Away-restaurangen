'use client';

import { Menu_Get } from '@/types/menu';
import { IoPricetag } from 'react-icons/io5';
import { FaBoxOpen } from 'react-icons/fa6';
import Link from 'next/link';

type Props = {
  item: Menu_Get;
};

export default function InventoryCard({ item }: Props) {
  return (
    <article className='w-[200px] bg-main-primary flex flex-col h-[320px] rounded-md overflow-clip'>
      <img src={item.image} alt={item.title} className='w-full h-[150px]' />
      <div className='w-full p-2 flex flex-col gap-2'>
        <h3 className='font-bold text-lg'>{item.title}</h3>
        <p className='flex items-center gap-1'>
          <span>
            <IoPricetag className='text-main-secondary' size={20} />
          </span>
          <span>{item.price}kr</span>
        </p>
        <p className='flex items-center gap-1'>
          <span>
            <FaBoxOpen className='text-main-secondary' size={20} />
          </span>
          <span>{item.inventory} in stock</span>
        </p>
      </div>
      <Link
        href={`/dashboard/menu/${item.id}`}
        className='mt-auto p-2 bg-main-secondary font-semibold text-center'
      >
        Update Inventory
      </Link>
    </article>
  );
}
