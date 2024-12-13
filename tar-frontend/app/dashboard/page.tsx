"use client";

import OrderItemCustomer from "@/components/Dashboard/OrderItemCustomer";
import OrdersChart from "@/components/Dashboard/OrdersChart";
import Chart from "@/components/Dashboard/SalesChart";
import ButtonBase from "@/components/shared/ButtonBase";
import { Menu_Get } from "@/types/menu";
import { Order_Get } from "@/types/order";
import { User_Get } from "@/types/user";
import { getUserByJWT } from "@/util/auth";
import { catchError } from "@/util/catchError";
import { getTokenFromLocalStorage } from "@/util/localStorage";
import { getMenu } from "@/util/menu";
import { getOrders } from "@/util/order";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

function Page() {
  const [menuItems, setMenuItems] = useState<Menu_Get[]>([]);
  const [orderItems, setOrderItems] = useState<Order_Get[]>([]);
  const [userData, setUserData] = useState<User_Get | null>(null);
  const [activeOrders, setActiveOrders] = useState<Order_Get[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const menu = await getMenu();
        const orders = await getOrders({ sort: "today" });
        const TOKEN = getTokenFromLocalStorage();
        if (!TOKEN) return redirect("/login");
        const signedInUser = await getUserByJWT(TOKEN);
        if (signedInUser) {
          setUserData(signedInUser);
        }
        setMenuItems(menu);
        setOrderItems(orders);
      } catch (error) {
        toast.error(catchError(error));
      }
    })();
  }, []);

  const refreshOrders = async () => {
    try {
      const orders = await userData!.orders;

      const activeOrders = orders.filter(
        (order) => order.status !== "cancelled" && order.status !== "ready"
      );

      setActiveOrders(activeOrders);
      toast.success("Orders refreshed");
    } catch (error) {
      console.error(catchError(error));
    }
  };

  useEffect(() => {
    console.log("triggered");

    if (userData) {
      try {
        const orders = userData!.orders;

        const activeOrders = orders.filter(
          (order) => order.status !== "cancelled" && order.status !== "ready"
        );

        setActiveOrders(activeOrders);
        toast.success("Orders refreshed");
      } catch (error) {
        console.error(error);
      }
    }
    if (userData) {
      const timeOut = setInterval(async () => {
        try {
          const orders = await userData!.orders;

          const activeOrders = orders.filter(
            (order) => order.status !== "cancelled" && order.status !== "ready"
          );

          setActiveOrders(activeOrders);
          toast.success("Orders refreshed");
        } catch (error) {
          console.error(error);
        }
      }, 30000);
      return () => clearInterval(timeOut);
    }
  }, [userData]);

  if (!menuItems || !orderItems || !userData) {
    return (
      <section className="w-full flex justify-center items-center">
        <section className="w-full aspect-square bg-transparent p-4">
          <p className="text-black">Loading..</p>
        </section>
      </section>
    );
  }

  return (
    <section className="w-full flex justify-center items-center text-black flex-wrap gap-4">
      {userData!.role === "Admin" ? (
        <>
          <section className="w-full bg-transparent p-4 max-w-lg">
            <h1 className="text-2xl font-motter text-center py-4">
              Number Of Sales
            </h1>
            <Chart items={menuItems} />
          </section>
          <section className="w-full bg-transparent p-4 max-w-lg">
            <h1 className="text-2xl font-motter text-center py-4">
              Orders Today
            </h1>

            <OrdersChart items={orderItems} />
          </section>
        </>
      ) : (
        // TODO: Implement a order history for the user here ↓
        <section className="w-full flex flex-col justify-center items-center gap-2 p-6">
          <p className="font-motter text-main-primary text-3xl">
            Welcome back {userData!.username}
          </p>

          <section className="w-full">
            <section className="flex justify-center items-center gap-2">
              <p className="font-motter text-2xl text-main-primary">
                Active orders
              </p>
              <ButtonBase
                text="Refresh Orders"
                onClick={refreshOrders}
                classname="border-2 border-black hover:bg-black hover:text-white transition-all du"
              ></ButtonBase>
            </section>
            <section className="w-full flex flex-col">
              {activeOrders.map((order) => (
                <OrderItemCustomer
                  key={order.id}
                  id={order.id}
                  items={order.items}
                  locked={order.isLocked}
                  status={order.status}
                  total={order.total}
                />
              ))}
            </section>
          </section>
        </section>
      )}
    </section>
  );
}
export default Page;
