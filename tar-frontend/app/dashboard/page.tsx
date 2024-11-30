import OrderItem from "@/components/Dashboard/OrderItem";
import React from "react";

const Page = () => {
  const orders = [
    {
      id: "1",
      status: "Pending",
      timeStamp: "24.05",
      locked: false,
    },
    {
      id: "2",
      status: "Pending",
      timeStamp: "24.05",
      locked: false,
    },
    {
      id: "3",
      status: "Pending",
      timeStamp: "24.05",
      locked: false,
    },
    {
      id: "4",
      status: "Pending",
      timeStamp: "24.05",
      locked: false,
    },
    {
      id: "5",
      status: "Pending",
      timeStamp: "24.05",
      locked: false,
    },
    {
      id: "6",
      status: "Pending",
      timeStamp: "24.05",
      locked: false,
    },
  ];
  return (
    <section className="w-full flex justify-center items-center">
      <section className="w-full aspect-square bg-white">
        <p className="text-black">Orders</p>

        <section className="flex flex-col justify-start items-start gap-2 p-6">
          {orders.map((order) => (
            <OrderItem
              key={order.id}
              id={order.id}
              locked={order.locked}
              status={order.status}
              timeStamp={order.timeStamp}
            />
          ))}
        </section>
      </section>
    </section>
  );
};
export default Page;
