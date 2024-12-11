'use client';

import OrdersChart from '@/components/Dashboard/OrdersChart';
import Chart from '@/components/Dashboard/SalesChart';
import { Menu_Get } from '@/types/menu';
import { Order_Get } from '@/types/order';
import { User_Get } from '@/types/user';
import { getUserByJWT } from '@/util/auth';
import { catchError } from '@/util/catchError';
import { getTokenFromLocalStorage } from '@/util/localStorage';
import { getMenu } from '@/util/menu';
import { getOrders } from '@/util/order';
import { redirect } from 'next/navigation';
import { useEffect, useState } from 'react';

function Page() {
  const [menuItems, setMenuItems] = useState<Menu_Get[]>([]);
  const [orderItems, setOrderItems] = useState<Order_Get[]>([]);
  const [user, setUser] = useState<User_Get | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const menu = await getMenu();
        const orders = await getOrders({ sort: 'today' });
        const TOKEN = getTokenFromLocalStorage();
        if (!TOKEN) return redirect('/login');
        const signedInUser = await getUserByJWT(TOKEN);
        setUser(signedInUser);
        setMenuItems(menu);
        setOrderItems(orders);
      } catch (error) {
        window.alert(catchError(error));
      }
    })();
  }, []);

  if (!menuItems || !orderItems || !user) {
    return (
      <section className='w-full flex justify-center items-center'>
        <section className='w-full aspect-square bg-transparent p-4'>
          <p className='text-black'>Loading..</p>
        </section>
      </section>
    );
  }

  return (
    <section className='w-full flex justify-center items-center text-black flex-wrap gap-4'>
      {user.role === 'Admin' ? (
        <>
          <section className='w-full bg-transparent p-4 max-w-lg'>
            <h1 className='text-2xl font-motter text-center py-4'>
              Number Of Sales
            </h1>
            <Chart items={menuItems} />
          </section>
          <section className='w-full bg-transparent p-4 max-w-lg'>
            <h1 className='text-2xl font-motter text-center py-4'>
              Orders Today
            </h1>

            <OrdersChart items={orderItems} />
          </section>
        </>
      ) : (
        // TODO: Implement a order history for the user here ↓
        <h1 className='text-2xl font-motter text-center py-4'>
          You are not authorized to view this page
        </h1>
      )}
    </section>
  );
}
export default Page;
