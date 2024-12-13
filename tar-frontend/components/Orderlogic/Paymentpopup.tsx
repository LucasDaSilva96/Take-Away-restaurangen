"use client";

import useCart from "@/store/zustandstore";
import { createOrder } from "@/util/order";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface PaymentpopupProps {
  toggle: () => void;
  email: string;
  message: string;
}

const Paymentpopup: React.FC<PaymentpopupProps> = ({
  toggle,
  email,
  message,
}) => {
  const { cart, amount, user, clearCart } = useCart();
  const [orderComp, setOrderComp] = useState<boolean>(false);

  const router = useRouter();

  const placeOrder = () => {
    if (user.id) {
      createOrder({
        items: cart,
        userId: user.id,
        message: message,
      }).then(() => {
        setOrderComp(true);
        setTimeout(() => {
          toggle();
          setOrderComp(false);
          clearCart();
          router.push("/dashboard/orders");
        }, 2000);
      });
    } else {
      createOrder({
        items: cart,
        guestEmail: email,
        message: message,
      }).then(() => {
        setOrderComp(true);
        setTimeout(() => {
          toggle();
          setOrderComp(false);
          clearCart();
          router.push("/");
        }, 2000);
      });
    }

    setOrderComp(true);
    setTimeout(() => {
      toggle();
      setOrderComp(false);
    }, 8000);
  };
  return (
    <>
      {orderComp ? (
        <section className="w-screen h-screen fixed z-400 top-0 left-0 flex justify-center items-center bg-black bg-opacity-25">
          <section className="w-80 min-h-80 rounded-md bg-slate-100 flex flex-col gap-2 justify-center items-center p-6">
            <p className="font-motter text-black">Thanks for your order!</p>

            <section className="w-full p-6">
              {cart.map((item) => (
                <section
                  key={item.id}
                  className="flex justify-between items-center"
                >
                  <p className="font-motter text-black">{item.title}</p>
                  <p className="font-motter text-black">{item.price}</p>
                  <p className="font-motter text-black">x{item.quantity}</p>
                </section>
              ))}
            </section>
            <section>
              <p className="text-black">Total: {amount} kr</p>
            </section>
            <section>
              <p className="text-black text-center">
                Updates will be sent to your email or on your dashboard if an
                account already exists!
              </p>
            </section>
          </section>
        </section>
      ) : (
        <section
          className={
            "w-screen h-screen fixed z-400 top-0 left-0 flex justify-center items-center bg-black bg-opacity-25"
          }
        >
          <section className="w-80 h-80 rounded-md bg-slate-100 flex flex-col gap-2 justify-center items-center p-6">
            <button
              onClick={toggle}
              className="w-full p-5 flex justify-center items-center bg-red-400 rounded"
            >
              Cancel payment
            </button>
            <button
              onClick={placeOrder}
              className="w-full p-5 flex justify-center items-center bg-black rounded"
            >
              Pay with{" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-14"
                viewBox="-76.79115 -52.55 665.5233 315.3"
              >
                <path
                  d="M93.541 27.1c-6 7.1-15.6 12.7-25.2 11.9-1.2-9.6 3.5-19.8 9-26.1 6-7.3 16.5-12.5 25-12.9 1 10-2.9
                         19.8-8.8 27.1m8.7 13.8c-13.9-.8-25.8 7.9-32.4 7.9-6.7 0-16.8-7.5-27.8-7.3-14.3.2-27.6 8.3-34.9 21.2-15
                          25.8-3.9 64 10.6 85 7.1 10.4 15.6 21.8 26.8 21.4 10.6-.4 14.8-6.9 27.6-6.9 12.9 0 16.6 6.9 27.8 6.7
                          11.6-.2 18.9-10.4 26-20.8 8.1-11.8 11.4-23.3 11.6-23.9-.2-.2-22.4-8.7-22.6-34.3-.2-21.4 17.5-31.6 18.3-32.2-10-14.8-25.6-16.4-31-16.8m80.3-29v155.9h24.2v-53.3h33.5c30.6 0 52.1-21 52.1-51.4s-21.1-51.2-51.3-51.2zm24.2 20.4h27.9c21 0 33 11.2 33 30.9s-12 31-33.1 31h-27.8zm129.8 136.7c15.2 0 29.3-7.7 35.7-19.9h.5v18.7h22.4V90.2c0-22.5-18-37-45.7-37-25.7 0-44.7 14.7-45.4 34.9h21.8c1.8-9.6 10.7-15.9 22.9-15.9 14.8 0 23.1 6.9 23.1 19.6v8.6l-30.2 1.8c-28.1 1.7-43.3 13.2-43.3 33.2 0 20.2 15.7 33.6 38.2 33.6zm6.5-18.5c-12.9 0-21.1-6.2-21.1-15.7 0-9.8 7.9-15.5 23-16.4l26.9-1.7v8.8c0 14.6-12.4 25-28.8 25zm82 59.7c23.6 0 34.7-9 44.4-36.3l42.5-119.2h-24.6l-28.5 92.1h-.5l-28.5-92.1h-25.3l41 113.5-2.2 6.9c-3.7 11.7-9.7 16.2-20.4 16.2-1.9 0-5.6-.2-7.1-.4v18.7c1.4.4 7.4.6 9.2.6z"
                  fill="#fff"
                />
              </svg>
            </button>
          </section>
        </section>
      )}
    </>
  );
};
export default Paymentpopup;
