"use client";

import ButtonBase from "@/components/shared/ButtonBase";
import useCart from "@/store/zustandstore";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();
  const { user } = useCart();

  return (
    <section className="w-full flex flex-col justify-start items-start p-4 gap-2">
      <section className="flex justify-center items-center w-full text-black font-motter text-2xl text-center">
        <h2>
          Previous orders for <br /> {user.email}{" "}
        </h2>
      </section>

      <section className="w-full flex flex-col">
        {user.orders.length > 0 ? (
          user.orders.map((order) => (
            <section className="w-full h-44 bg-main-secondary ">
              {/* Columns for order history details */}
              <div className="border-2 border-main-moss flex justify-between text-xl  lg:text-2xl">
                <div className=" w-full">
                  <h2 className="text-center text-main-primary">Order ID</h2>
                </div>
                <div className="border-x-2 border-main-moss w-full">
                  <h2 className="text-center  text-main-primary">Menu</h2>
                </div>
                <div className=" w-full">
                  <h2 className="text-center  text-main-primary">Price</h2>
                </div>
              </div>
              {/* Order history details */}
              <div className=" flex justify-between text-xl  lg:text-2xl">
                <div className=" w-full">
                  <p className="text-center text-sm  text-main-primary">
                    {order.id}
                  </p>
                </div>
                <div className="w-full">
                  <p className="text-center text-sm  text-main-primary">
                    Måste fixa här
                  </p>
                </div>
                <div className=" w-full">
                  <p className="text-center text-sm  text-main-primary">
                    {order.total}
                  </p>
                </div>
              </div>
            </section>
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
  );
};

export default Page;
