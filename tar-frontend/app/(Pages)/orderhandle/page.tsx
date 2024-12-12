'use client';

import ButtonBase from '@/components/shared/ButtonBase';
import { Order_Get } from '@/types/order';
import { deleteOrder, getOrderById, updateOrder } from '@/util/order';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { IoMdAdd } from 'react-icons/io';
import { FaMinus } from 'react-icons/fa6';
import { MdDelete } from 'react-icons/md';

const Page = () => {
  const [order, setOrder] = useState<Order_Get>();
  const [orderFound, setOrderFound] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [idField, setIdField] = useState<string>('');

  const findOrder = async (orderID: string) => {
    if (!orderID) {
      toast.error('Please enter an order id');
      return;
    }
    try {
      setLoading(true);
      const order = await getOrderById(orderID);
      if (!order) {
        setOrderFound(false);
        throw new Error('Order not found');
      }
      setOrder(order);
      setOrderFound(true);
    } catch (error) {
      console.error(error);
      toast.error('Order not found');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    (async () => {
      if (!order) return;
      const orderId = order.id;
      try {
        setLoading(true);
        if (order.items.length === 0) {
          await deleteOrder(orderId);
          toast.success('Order successfully cancelled');
          setOrderFound(false);
          setIdField('');
        }
      } catch (error) {
        console.error(error);
        toast.error('Failed to update order');
      } finally {
        setLoading(false);
      }
    })();
  }, [order]);

  const handleIncrease = (index: number) => {
    setOrder((e) => {
      if (!e) return e;
      return {
        ...e,
        items: e.items.map((item, i) => {
          if (i === index) {
            return {
              ...item,
              quantity: item.quantity + 1,
            };
          }
          return item;
        }),
      };
    });
  };

  const handleRemove = (index: number) => {
    setOrder((e) => {
      if (!e) return e;
      return {
        ...e,
        items: e.items.filter((_, i) => i !== index),
      };
    });
  };

  const handleDecrease = (index: number) => {
    if (!order) return;

    const itemQuantity = order.items[index].quantity;

    if (itemQuantity === 1) {
      handleRemove(index);
      return;
    }

    setOrder((e) => {
      if (!e) return e;
      return {
        ...e,
        items: e.items.map((item, i) => {
          if (i === index) {
            return {
              ...item,
              quantity: item.quantity - 1,
            };
          }
          return item;
        }),
      };
    });
  };

  const handleUpdateOrder = async () => {
    if (!order) return;
    try {
      setLoading(true);
      const updatedOrder = {
        items: order.items,
      };
      await updateOrder({ id: order.id, order: updatedOrder });
      toast.success('Order updated successfully');
      setIdField('');
      setOrderFound(false);
    } catch (error) {
      console.error(error);
      toast.error('Failed to update order');
    } finally {
      setLoading(false);
    }
  };

  if (loading)
    return (
      <div className='w-full min-h-[90dvh] flex justify-center items-center'>
        <h1 className='text-main-primary font-mono uppercase text-2xl'>
          Loading...
        </h1>
      </div>
    );

  return (
    <section className='w-full min-h-screen flex justify-center items-center'>
      {!orderFound && (
        <section className='p-2 flex flex-col gap-2 justify-center items-center'>
          <h2 className='font-motter text-2xl text-main-primary'>
            Check status of your order!
          </h2>

          <fieldset className='w-full flex flex-col gap-2'>
            <label
              className='font-alumni text-3xl font-bold text-main-primary'
              htmlFor='orderId'
            >
              OrderId
            </label>
            <input
              type='text'
              placeholder='Please enter the orderId'
              className='w-full p-2 border-2 border-main-primary rounded-md text-black'
              onChange={(e) => setIdField(e.currentTarget.value)}
              value={idField}
            />
          </fieldset>

          <ButtonBase
            text='Find order'
            classname='border-2 border-main-primary text-main-primary hover:text-main-light hover:bg-main-primary transition-all duration-300'
            onClick={() => findOrder(idField)}
          />
        </section>
      )}

      {orderFound && (
        <section className='p-4 flex flex-col gap-2 justify-center items-center max-w-lg'>
          <h2 className='font-motter text-2xl text-main-primary'>
            Order Found!
          </h2>
          {order?.status === 'ready' ? (
            <p className='text-main-primary text-center'>
              Your order is ready for pickup!
            </p>
          ) : (
            <p className='text-main-primary text-center'>
              Your order is{' '}
              {order?.isLocked
                ? 'Being made. Changes can no longer be made'
                : 'not yet processed. What do you want to change?'}
            </p>
          )}

          {order && order.status !== 'ready' && (
            <section className='w-full flex flex-col justify-start items-start'>
              <div className='w-full max-h-96 p-2 overflow-y-auto flex flex-col gap-2'>
                {order &&
                  order.items.map((item, index) => (
                    <div
                      key={index}
                      className='w-full h-30 border flex text-black items-center gap-2 justify-between p-2 rounded-md bg-main-primary'
                    >
                      <Image
                        src={item.image}
                        alt={item.title}
                        height={90}
                        width={90}
                      />
                      <div className='flex flex-col items-center'>
                        <h1 className='font-motter'>
                          {item.title} x {item.quantity}
                        </h1>
                        <span className='font-light text-xs'>
                          Total: {item.price * item.quantity}$
                        </span>
                      </div>

                      <div className='flex items-center gap-4'>
                        <button
                          disabled={order?.isLocked}
                          onClick={() => handleIncrease(index)}
                        >
                          <IoMdAdd size={24} color='#EFE1D9' />
                        </button>
                        <button
                          disabled={order?.isLocked}
                          onClick={() => handleDecrease(index)}
                        >
                          <FaMinus size={24} color='#EFE1D9' />
                        </button>
                        <button
                          disabled={order?.isLocked}
                          onClick={() => handleRemove(index)}
                        >
                          <MdDelete size={24} color='#B42638' />
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
              <div className='w-full flex flex-col gap-2'>
                <button
                  onClick={handleUpdateOrder}
                  disabled={loading || order?.isLocked}
                  className={`w-[95%] text-center p-2 ${
                    order?.isLocked ? 'bg-main-secondary' : 'bg-main-primary'
                  } self-center text-black font-mono font-bold text-lg rounded-md`}
                >
                  {loading
                    ? 'Updating...'
                    : order?.isLocked
                    ? 'Locked'
                    : 'Update'}
                </button>

                <button
                  disabled={
                    loading || order?.isLocked || order?.status === 'cancelled'
                  }
                  className={`w-[95%] text-center p-2 ${
                    order?.isLocked ? 'bg-main-secondary' : 'bg-main-primary'
                  } self-center text-black font-mono font-bold text-lg rounded-md`}
                >
                  {order?.status === 'cancelled'
                    ? 'Order is Cancelled'
                    : 'Cancel'}
                </button>
              </div>
            </section>
          )}
        </section>
      )}
    </section>
  );
};

export default Page;
