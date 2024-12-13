"use clinet";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import ButtonBase from "../shared/ButtonBase";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { CartProduct } from "@/store/zustandstore";

interface OrderItemProps {
  id: string;
  status: string;
  locked: boolean;
  items: CartProduct[];
  total: number;
}

const OrderItemCustomer: React.FC<OrderItemProps> = ({
  id,
  locked,
  status,
  items,
  total,
}) => {
  const [viewDetails, setViewDetails] = useState<boolean>(false);
  const statusString = status[0].toUpperCase() + status.slice(1);

  const router = useRouter();

  const sendToEdit = (id: string) => {
    try {
      navigator.clipboard.writeText(id);
      toast.success("Order id copied to clipboard");

      router.push("/orderhandle");
    } catch (error) {
      toast.error("Error copying order id to clipboard");
      console.error(error);
    }
  };
  return (
    <>
      <section className="w-full rounded-md bg-main-light p-4 flex flex-col gap-2 md:flex-row justify-between items-center">
        <section className="bg-main-secondary w-14 h-14 flex justify-center items-center rounded-md">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="26"
            height="30"
            viewBox="0 0 26 30"
            fill="none"
          >
            <path
              d="M6.3 29.0002C5.69001 29.0002 5.10498 28.7579 4.67365 28.3265C4.24231 27.8952 4 27.3102 4 26.7002L5 14.2002H7.7L8.7 26.7002C8.70029 27.0108 8.63766 27.3183 8.51587 27.6041C8.39408 27.8899 8.21566 28.148 7.99138 28.3629C7.7671 28.5779 7.5016 28.7452 7.21091 28.8547C6.92021 28.9642 6.61035 29.0137 6.3 29.0002Z"
              stroke="#EBA13D"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M6.3 14.2C9.22711 14.2 11.6 11.2451 11.6 7.60001C11.6 3.95493 9.22711 1 6.3 1C3.37289 1 1 3.95493 1 7.60001C1 11.2451 3.37289 14.2 6.3 14.2Z"
              stroke="#EBA13D"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M20.1994 28.9997C19.5894 28.9997 19.0044 28.7574 18.5731 28.326C18.1417 27.8947 17.8994 27.3097 17.8994 26.6997L18.8994 14.1997H21.5994L22.5994 26.6997C22.5997 27.0103 22.5371 27.3178 22.4153 27.6036C22.2935 27.8894 22.1151 28.1475 21.8908 28.3625C21.6665 28.5774 21.401 28.7447 21.1103 28.8542C20.8196 28.9637 20.5098 29.0132 20.1994 28.9997Z"
              stroke="#EBA13D"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M24.6996 9.69971C24.6735 10.9023 24.1773 12.0468 23.3174 12.8879C22.4576 13.7291 21.3025 14.2 20.0996 14.1997C18.9061 14.1997 17.7615 13.7256 16.9176 12.8817C16.0737 12.0378 15.5996 10.8932 15.5996 9.69971H24.6996Z"
              stroke="#EBA13D"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M15.5996 1.3999V9.69992"
              stroke="#EBA13D"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M20.0996 1.3999V9.49991"
              stroke="#EBA13D"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M24.6992 1.3999V9.69992"
              stroke="#EBA13D"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </section>
        <section className="w-full flex justify-center items-center">
          <section className="w-full flex justify-center items-center">
            <div>
              <p className="text-main-primary font-alumni font-bold text-xl">
                Order #{id}
              </p>
              <p className="text-main-secondary font-alumni text-lg">
                <span className="font-bold">Status:</span> {statusString}
              </p>
            </div>
          </section>

          <section className="w-full flex justify-center items-center">
            <div>
              <p className="text-main-primary font-alumni font-bold text-xl">
                Order Locked
              </p>
              <p className="text-main-secondary font-alumni text-lg">
                {locked ? "Yes" : "No"}
              </p>
            </div>
          </section>
        </section>

        {!locked && (
          <section className="flex justify-center items-center">
            <button
              onClick={() => sendToEdit(id)}
              className="border-2 border-main-primary text-main-primary font-alumni text-nowrap rounded-full px-4 py-1 hover:text-main-light hover:bg-main-primary transition-all font-bold"
            >
              Edit order
            </button>
          </section>
        )}
        <section className="flex justify-center items-center">
          <button
            onClick={() => setViewDetails(!viewDetails)}
            className="border-2 border-main-primary text-main-primary font-alumni text-nowrap rounded-full px-4 py-1 hover:text-main-light hover:bg-main-primary transition-all font-bold"
          >
            View Details
          </button>
        </section>
      </section>
      <AnimatePresence>
        {viewDetails && (
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute z-50 top-0 left-0 w-screen h-screen flex justify-center items-center bg-black bg-opacity-30"
          >
            <section className=" rounded-md min-w-60 bg-white p-6">
              <p className="text-black font-motter">Order details</p>

              <section className="w-full flex flex-col justify-start items-start">
                {items.length > 0 &&
                  items.map((item) => (
                    <article
                      key={item.id}
                      className="w-full flex justify-between gap-2 items-center"
                    >
                      <p className="text-black font-alumni w-1/3 text-nowrap">
                        {item.title}
                      </p>{" "}
                      x{" "}
                      <p className="text-black font-alumni w-1/3 text-nowrap">
                        {item.quantity}
                      </p>
                    </article>
                  ))}
              </section>

              <section>
                <p className="font-motter text-black">Price: {total}€</p>
              </section>
              <ButtonBase
                text="Close view"
                onClick={() => setViewDetails(!viewDetails)}
                classname="bg-main-primary text-white"
              />
            </section>
          </motion.section>
        )}
      </AnimatePresence>
    </>
  );
};

export default OrderItemCustomer;

/**
 *
 *
 */
