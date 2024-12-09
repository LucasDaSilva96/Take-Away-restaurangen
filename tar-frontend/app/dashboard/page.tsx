import OrdersChart from '@/components/Dashboard/OrdersChart';
import Chart from '@/components/Dashboard/SalesChart';
import { getMenu } from '@/util/menu';
import { getOrders } from '@/util/order';

async function Page() {
  const menuItems = await getMenu();
  const orderItems = await getOrders({ sort: 'today' });

  if (!menuItems || !orderItems) {
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
      <section className='w-full bg-transparent p-4 max-w-lg'>
        <h1 className='text-2xl font-motter text-center py-4'>
          Number Of Sales
        </h1>
        <Chart items={menuItems} />
      </section>
      <section className='w-full bg-transparent p-4 max-w-lg'>
        <h1 className='text-2xl font-motter text-center py-4'>Orders Today</h1>

        <OrdersChart items={orderItems} />
      </section>
    </section>
  );
}
export default Page;
