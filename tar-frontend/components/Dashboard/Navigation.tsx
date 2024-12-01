'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navigation() {
  const pathname = usePathname();
  const navigationObject = [
    {
      title: 'Dashboard',
      icon: '/dashboard-menu-icons/dashboard.png',
      url: '/dashboard',
    },
    {
      title: 'Orders',
      icon: '/dashboard-menu-icons/orders.png',
      url: '/dashboard/orders',
    },
    {
      title: 'Inventory',
      icon: '/icons/clock.png',
      url: '/dashboard/inventory',
    },
    {
      title: 'Menu',
      icon: '/dashboard-menu-icons/menu.png',
      url: '/dashboard/menu',
    },
    {
      title: 'Settings',
      icon: '/dashboard-menu-icons/settings.png',
      url: '/dashboard/settings',
    },
  ];
  return (
    <nav className={`flex lg:flex-col flex-wrap gap-4 p-2 w-full items-center`}>
      {navigationObject.map((item, index) => (
        <Link
          key={index}
          href={item.url}
          className={`w-40 flex items-center gap-2 h-9 ${
            pathname === item.url ? 'text-slate-50' : 'text-main-primary'
          }`}
        >
          {/* TODO: change to svg */}
          <img src={item.icon} alt={item.title} className='h-7 w-7' />
          <p>{item.title}</p>
        </Link>
      ))}
    </nav>
  );
}
