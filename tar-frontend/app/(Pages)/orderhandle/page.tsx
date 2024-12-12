"use client";

import ButtonBase from "@/components/shared/ButtonBase";
import ItemInCart from "@/components/shared/ItemInCart";
import { Order_Get } from "@/types/order";
import { getOrderById } from "@/util/order";
import { useState } from "react";

const Page = () => {
  const [order, setOrder] = useState<Order_Get>();
  const [orderFound, setOrderFound] = useState<boolean>(false);

  const [idField, setIdField] = useState<string>("");

  const findOrder = async (orderID: string) => {
    getOrderById(orderID).then((order) => {
      if (order) {
        setOrder(order);
        setOrderFound(true);
        console.log(order);
      } else {
        setOrderFound(false);
        alert("Order not found");
      }
    });
  };

  return (
    <section className="w-full min-h-screen flex justify-center items-center">
      {!orderFound && (
        <section className="p-2 flex flex-col gap-2 justify-center items-center">
          <h2 className="font-motter text-2xl text-main-primary">
            Check status of your order!
          </h2>

          <fieldset className="w-full flex flex-col gap-2">
            <label
              className="font-alumni text-3xl font-bold text-main-primary"
              htmlFor="orderId"
            >
              OrderId
            </label>
            <input
              type="text"
              placeholder="Please enter the orderId"
              className="w-full p-2 border-2 border-main-primary rounded-md"
              onChange={(e) => setIdField(e.currentTarget.value)}
              value={idField}
            />
          </fieldset>

          <ButtonBase
            text="Find order"
            classname="border-2 border-main-primary text-main-primary hover:text-main-light hover:bg-main-primary transition-all duration-300"
            onClick={() => findOrder(idField)}
          />
        </section>
      )}

      {orderFound && (
        <section className="p-4 flex flex-col gap-2 justify-center items-center max-w-96">
          <h2 className="font-motter text-2xl text-main-primary">
            Order Found!
          </h2>
          <p className="text-main-primary text-center">
            Your order is{" "}
            {order?.isLocked
              ? "Being made. Changes can no longer be made"
              : "not yet processed. What do you want to change?"}
          </p>

          <section className="w-full flex flex-col justify-start items-start">
            {order?.items.map((item, index) => (
              <ItemInCart item={item} key={index} />
            ))}
          </section>

          {!order?.isLocked && (
            <ButtonBase
              text="Update Order"
              classname="border-2 border-main-primary text-main-primary hover:text-main-light hover:bg-main-primary transition-all duration-300"
              onClick={() => findOrder(idField)}
            />
          )}
        </section>
      )}
    </section>
  );
};

export default Page;
