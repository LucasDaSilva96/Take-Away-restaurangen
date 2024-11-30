"use client";

import OrderItem from "@/components/Dashboard/OrderItem";
import { Order_Get } from "@/types/order";
import { getOrders } from "@/util/order";
import React, { useEffect, useState } from "react";

const Page = () => {
  const [orders, setOrders] = useState<Order_Get[]>([]);

  useEffect(() => {
    const fetchLoader = async () => {
      try {
        const orders = await getOrders({ sort: "today" });
        setOrders(orders);
      } catch (error) {
        console.error(error);
      }
    };

    fetchLoader();
  }, []);

  return (
    <section className="w-full flex justify-center items-center">
      <section className="w-full aspect-square bg-white">
        <p className="text-black">Orders</p>

        <section className="flex flex-col justify-start items-start gap-2 p-6">
          {orders.map((order) => (
            <OrderItem
              key={order.id}
              id={order.id}
              locked={order.isLocked}
              status={order.status}
              timeStamp={order.timestamp}
            />
          ))}
        </section>
      </section>
    </section>
  );
};
export default Page;
