"use client";

import OrderItemHistory from "@/components/Dashboard/OrderItemHistory";
import ButtonBase from "@/components/shared/ButtonBase";
import useCart from "@/store/zustandstore";
import { Order_Get } from "@/types/order";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

interface Order {
  id: string;
  items: { title: string }[]; // Anpassa efter dina data
  total: number;
  timestamp: string;
}

const Page = () => {
  const router = useRouter();
  const { user } = useCart();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [orderDetails, setOrderDetails] = useState<Order_Get | null>(null);

  const [filteredOrders, setFilteredOrders] = useState<Order_Get[]>([]);

  const handleReorderButton = async (order: Order) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/order/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            items: order.items,
            message: `Reorder of order ${order.id}`,
            userId: user.id,
            guestEmail: user.email || null,
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to reorder");
      }
      const result = await response.json();
      console.log("Reorder successful: ", result);

      setShowConfirmation(true);
      setOrderDetails(result.data);
    } catch (error) {
      console.error("Reorder failed:", error);
      alert("Failed to place reorder. Please try again.");
    }
  };

  useEffect(() => {
    if (user) {
      setFilteredOrders(
        user.orders.filter((order) => order.status !== "pending")
      );
    }
  }, [user]);

  return (
    <>
      <section className="w-full flex flex-col justify-start items-start p-4 gap-2">
        <section className="flex justify-center items-center w-full text-black font-motter text-2xl text-center">
          <h2>
            Previous orders for <br /> {user.email}{" "}
          </h2>
        </section>
        {/*  border-main-moss flex justify-between */}

        <section className="w-full flex flex-col p-6B">
          {filteredOrders.length > 0 ? (
            filteredOrders.map((order) => (
              <OrderItemHistory
                key={order.id}
                order={order}
                onReorder={() => handleReorderButton(order)}
              />
            ))
          ) : (
            <div className="w-full flex flex-col justify-center items-center gap-2">
              <p className="text-black font-motter">Oops no orders here!</p>
              <ButtonBase
                text="Order Now"
                classname="border-2 border-main-primary text-main-primary font-motter hover:bg-main-primary hover:text-white transition-all"
                onClick={() => router.push("/menu")}
              />
            </div>
          )}
        </section>
      </section>

      {showConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded shadow-md text-center max-w-md">
            <h2 className="text-xl font-bold text-green-600 mb-4">
              Order Confirmed!
            </h2>
            {orderDetails && (
              <p className="mb-4 text-black">
                Thank you for your reorder! Your order ID is{" "}
                <span className="font-semibold">{orderDetails.id}</span> and the
                total price is{" "}
                <span className="font-semibold">${orderDetails.total}</span>.
              </p>
            )}
            <button
              onClick={() => setShowConfirmation(false)}
              className="px-4 py-2 bg-main-primary text-white rounded hover:bg-main-secondary transition-all"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Page;
