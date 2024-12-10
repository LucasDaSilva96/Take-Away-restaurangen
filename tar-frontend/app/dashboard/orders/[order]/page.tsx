"use client";

import { Order_Get } from "@/types/order";
import { getOrderById, updateOrder } from "@/util/order";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

const Page = () => {
  //Get params
  const params = useParams<{ order: string }>();

  //Use Next router to navigate on correct functions
  const route = useRouter();

  //Localy store active order
  const [order, setOrder] = useState<Order_Get>();

  //Localy store resturant messages
  const [resMessage, setResMessage] = useState<string>();

  const [renderToggle, setRenderToggle] = useState(0);

  //Get order by id
  const retriveOrder = async () => {
    try {
      const param = await params.order;
      const getOrder = await getOrderById(param);
      const data = getOrder;
      setOrder(data);
      setResMessage(data.chefNote);
    } catch (error) {
      console.error(error);
    }
  };

  //Use effect to get order on page load
  useEffect(() => {
    retriveOrder();
  }, [renderToggle]);

  //Lock order
  const toggleLock = async () => {
    try {
      if (order) {
        const updatedOrder = { ...order, isLocked: !order.isLocked };

        const dbSend = {
          items: order.items,
          message: order.message,
          status: order.status,
          isLocked: !order.isLocked,
          total: order.total,
        };
        await updateOrder({ id: order.id, order: dbSend });
        setOrder(updatedOrder);
        setRenderToggle((prev) => prev + 1);
      }
    } catch (error) {
      console.error(error);
    }
  };

  //Add message from resturant
  const updateChefNote = async (add: boolean) => {
    try {
      //Check if goal is to add message or clear a request
      if (!add) {
        if (order) {
          const updatedOrder = { ...order, chefNote: "" };

          const dbSend = {
            items: order.items,
            message: order.message,
            chefNote: "",
            status: order.status,
            isLocked: !order.isLocked,
            total: order.total,
          };
          await updateOrder({ id: order.id, order: dbSend });
          alert("Chef note updated");
          setOrder(updatedOrder);
          setRenderToggle((prev) => prev + 1);
        }
      } else {
        if (order) {
          const updatedOrder = { ...order, chefNote: resMessage || "" };

          const dbSend = {
            items: order.items,
            message: order.message,
            chefNote: resMessage,
            status: order.status,
            isLocked: !order.isLocked,
            total: order.total,
          };
          await updateOrder({ id: order.id, order: dbSend });
          alert("Chef note updated");
          setOrder(updatedOrder);
          setRenderToggle((prev) => prev + 1);
        }
      }
    } catch (error) {
      console.error(error);
      setRenderToggle((prev) => prev + 1);
    }
  };
  const cancelOrder = async () => {
    try {
      if (order) {
        const dbSend = {
          items: order.items,
          message: order.message,
          status: "cancelled",
          isLocked: order.isLocked,
          total: order.total,
        };
        await updateOrder({ id: order.id, order: dbSend });
        setRenderToggle((prev) => prev + 1);
        route.push("/dashboard/orders");
      }
    } catch (error) {
      console.error(error);
    }
  };
  const completeOrder = async () => {
    try {
      if (order) {
        const dbSend = {
          items: order.items,
          message: order.message,
          status: "ready",
          isLocked: order.isLocked,
          total: order.total,
        };
        await updateOrder({ id: order.id, order: dbSend });
        setRenderToggle((prev) => prev + 1);
        route.push("/dashboard/orders");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {order && (
        <section className="w-full flex flex-col gap-2 p-4">
          <section className="w-full md:flex-row gap-2 md:gap-0 text-center flex-col flex justify-between items-center bg-main-primary p-4 rounded-md">
            <div className="md:w-1/3 flex justify-center items-center">
              <p className="text-main-light font-motter">Order # {order.id}</p>
            </div>
            <div className="md:w-1/3 flex justify-center items-center">
              <p>Status: Order {order.status}</p>
            </div>
            <div className="md:w-1/3 flex justify-center items-center">
              <button
                onClick={toggleLock}
                disabled={order.isLocked}
                className="border-2 border-main-secondaryLight font-motter text-main-secondaryLight px-2 py-1 rounded"
              >
                {order.isLocked ? "Order locked" : "Lock order"}
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
                        {item.title} x {item.quantity}
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
          <section className="w-full p-2 rounded-md gap-2 bg-main-light flex justify-center items-start">
            <div className="w-full rounded-md p-2 bg-main-primary">
              <p className="text-black font-motter">Resturant Message</p>

              <textarea
                name="resmessage"
                id=""
                value={resMessage || ""}
                className="w-full h-full rounded-md p-2 bg-main-light text-main-navy font-motter"
                onChange={(e) => setResMessage(e.currentTarget.value)}
              ></textarea>
              <section className="w-full flex gap-2 justify-center items-center">
                <button
                  onClick={() => updateChefNote(true)}
                  className="border-2 px-2 py-1 rounded-md hover:text-main-primary hover:bg-main-light transition-all font-alumni text-2xl font-bold"
                >
                  Confirm chef note
                </button>
                <button
                  onClick={() => updateChefNote(false)}
                  className="border-2 px-2 py-1 rounded-md hover:text-main-primary hover:bg-main-light transition-all font-alumni text-2xl font-bold"
                >
                  Clear notes
                </button>
              </section>
            </div>
          </section>
          <section className="w-full flex justify-center items-center gap-2 flex-col p-2 md:flex-row">
            <button
              onClick={cancelOrder}
              className="w-full border-2 border-main-secondaryLight text-main-secondaryLight font-motter py-2 px-2 rounded-md hover:text-main-light hover:bg-main-secondaryLight transition-all"
            >
              Cancel Order
            </button>
            <button
              onClick={completeOrder}
              className="w-full border-2 transition-all border-green-500 py-2 px-2 rounded-md font-motter text-green-500  hover:text-main-light hover:bg-green-500"
            >
              Complete Order
            </button>
          </section>
        </section>
      )}
    </>
  );
};

export default Page;
