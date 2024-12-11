'use client';
import { FaBoxOpen } from 'react-icons/fa6';
import { IoPricetag } from 'react-icons/io5';
import { MdOutlineQueryStats } from 'react-icons/md';
import { Menu_Get } from '@/types/menu';
import Link from 'next/link';
import { deleteMenu } from '@/util/menu';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

type MenuItemBoxProps = {
  item: Menu_Get;
};

export default function MenuItemBox({ item }: MenuItemBoxProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();
  const handleDelete = async (id: string) => {
    try {
      setIsDeleting(true);
      await deleteMenu(id);
      router.refresh();
      toast.success('Menu item deleted');
    } catch (error) {
      console.error(error);
      toast.error('Failed to delete menu item');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className='flex w-full bg-main-primary rounded-md'>
      <div>
        <img
          src={item.image}
          alt={item.title}
          className='h-20 h-20 rounded-md'
        />
      </div>
      <div className='p-2 flex items-center gap-4 flex-wrap'>
        <h2 className='font-mono'>{item.title}</h2>
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
        <p className='flex items-center gap-1'>
          <span>
            <MdOutlineQueryStats className='text-main-secondary' size={20} />
          </span>
          <span>{item.numberOfSales} sold</span>
        </p>
      </div>
      <div className='ml-auto p-2 flex items-center gap-2 flex-wrap'>
        <Link href={`/dashboard/menu/${item.id}`}>
          <p className='flex items-center justify-center bg-main-secondary text-white p-2 rounded-md'>
            Edit
          </p>
        </Link>
        <button
          onClick={async () => await handleDelete(item.id)}
          disabled={isDeleting}
          className='flex items-center justify-center bg-main-secondary text-white p-2 rounded-md'
        >
          {isDeleting ? 'Deleting...' : 'Delete'}
        </button>
      </div>
    </div>
  );
}
