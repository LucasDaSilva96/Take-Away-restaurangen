"use client";

import { Order_Get } from "@/types/order";
import { getOrderById } from "@/util/order";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

const Page = () => {
  const params = useParams<{ order: string }>();

  const [order, setOrder] = useState<Order_Get>();

  useEffect(() => {
    const retriveOrder = async () => {
      try {
        const order = await getOrderById(params.order);
        console.log(order);
        setOrder(order);
      } catch (error) {
        console.error(error);
      }
    };

    retriveOrder();
  }, []);

  return (
    <>
      {order && (
        <section className="w-8/12 aspect-square flex flex-col gap-2 p-4">
          <section className="w-full flex justify-between items-center bg-main-primary p-4 rounded-md">
            <div>
              <p className="text-main-light font-motter">Order # {order.id}</p>
            </div>
            <div>
              <p>Status: Order {order.status}</p>
            </div>
            <div>
              <button className="border-2 border-main-secondaryLight font-motter text-main-secondaryLight px-2 py-1 rounded">
                Lock order
              </button>
            </div>
          </section>

          <section className="w-full p-2 rounded-md gap-2 bg-main-light flex flex-col md:flex-row justify-center items-start">
            <div className="w-full h-full rounded-md p-2 bg-main-primary">
              <p className="text-black font-motter">Customer Details</p>
              {order.userId && (
                <p className="text-main-light font-motter">
                  Customer ID: {order.userId}
                </p>
              )}
              <p className="text-main-light font-motter">
                Email: {order.guestEmail}
              </p>
            </div>
            <div className="w-full rounded-md p-2 bg-main-primary">
              <p className="text-black font-motter">Order Details</p>
              <section className="w-full flex flex-col justify-start items-start">
                {order.items.map((item) => (
                  <section
                    key={item.id}
                    className="w-full flex justify-between items-center"
                  >
                    <div>
                      <p className="text-main-light font-motter">
                        {item.name} x {item.quantity}
                      </p>
                    </div>
                    <div>
                      <p className="text-main-light font-alumni text-xl font-bold">
                        {item.price * item.quantity}
                      </p>
                    </div>
                  </section>
                ))}
              </section>
            </div>
          </section>
          <section className="w-full p-2 rounded-md gap-2 bg-main-light flex justify-center items-start">
            <div className="w-full rounded-md p-2 bg-main-primary">
              <p className="text-black font-motter">Message from customer</p>

              <section className="w-full p-4 mt-2 bg-main-light rounded">
                <p className="text-black">{order.message}</p>
              </section>
            </div>
          </section>
          <section className="w-full flex justify-center items-center gap-2 flex-col p-2 md:flex-row">
            <button className="w-full border-2 border-main-secondaryLight text-main-secondaryLight font-motter py-2 px-2 rounded-md hover:text-main-light hover:bg-main-secondaryLight transition-all">
              Cancel Order
            </button>
            <button className="w-full border-2 transition-all border-green-500 py-2 px-2 rounded-md font-motter text-green-500  hover:text-main-light hover:bg-green-500">
              Complete Order
            </button>
          </section>
        </section>
      )}
    </>
  );
};

export default Page;
