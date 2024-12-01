"use client";

import OrderItem from "@/components/Dashboard/OrderItem";
import ButtonBase from "@/components/shared/ButtonBase";
import { Order_Get } from "@/types/order";
import { getOrders } from "@/util/order";
import React, { useEffect, useState } from "react";

const Page = () => {
  const [orders, setOrders] = useState<Order_Get[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchLoader = async () => {
    try {
      setLoading(true);
      const orders = await getOrders({ sort: "today" });
      setOrders(orders);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLoader();
  }, []);

  return (
    <section className="w-full flex justify-center items-center">
      <section className="w-full bg-transparent p-2">
        <p className="text-black font-motter text-2xl">Orders</p>

        {orders.length > 0 && (
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
        )}

        {orders.length === 0 && (
          <section className="w-full p-4 flex justify-center flex-col gap-2 items-center">
            <p className="text-black font-alumni font-bold text-3xl">
              No active orders right now!
            </p>
            <ButtonBase
              classname="border-2 text-main-primary border-main-primary hover:bg-main-primary hover:text-white transition-all"
              text={loading ? "Loading..." : "Refresh orders"}
              onClick={fetchLoader}
            ></ButtonBase>
          </section>
        )}
      </section>
    </section>
  );
};
export default Page;
