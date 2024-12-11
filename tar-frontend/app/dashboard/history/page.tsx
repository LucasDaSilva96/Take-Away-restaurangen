"use client";

import ButtonBase from "@/components/shared/ButtonBase";
import useCart from "@/store/zustandstore";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();
  const { user } = useCart();

  return (
    <>
      <section className="w-full flex flex-col justify-start items-start p-4 gap-2">
        <section className="flex justify-center items-center w-full text-black font-motter text-2xl text-center">
          <h2>
            Previous orders for <br /> {user.email}{" "}
          </h2>
        </section>
        {/*  border-main-moss flex justify-between */}

        <section className="w-full flex flex-col ">
          {user.orders.length > 0 ? (
            user.orders.map((order) => (
              <section className="w-full h-64 bg-main-secondary flex  mb-10">
                {/* Columns for order history details */}
                <div className="border-2 border-main-moss text-xl flex flex-col justify-between lg:text-2xl ">
                  <div className=" h-full flex justify-center items-center ">
                    <h2 className="text-center text-main-primary">Order ID</h2>
                  </div>
                  <div className="border-y-2 h-full flex justify-center items-center border-main-moss w-full">
                    <h2 className="text-center  text-main-primary">Menu</h2>
                  </div>
                  <div className=" h-full flex justify-center items-center">
                    <h2 className="text-center  text-main-primary">Price</h2>
                  </div>
                  <div className="h-full flex justify-center items-center border-t-2 border-main-moss">
                    <h2 className="text-center  text-main-primary ">Date</h2>
                  </div>
                </div>
                {/* Order history details */}
                <div className=" flex flex-col w-full justify-between text-xl  lg:text-2xl">
                  <div className=" h-full flex justify-center items-center">
                    <p className="text-center text-lg  text-main-primary">
                      {order.id}
                    </p>
                  </div>
                  <div className="h-full flex justify-center items-center">
                    {order.items.map((item) => (
                      <p className="text-center text-lg  text-main-primary">
                        {item.title}
                      </p>
                    ))}
                  </div>
                  <div className=" h-full flex justify-center items-center">
                    <p className="text-center text-lg  text-main-primary">
                      {order.total}
                    </p>
                  </div>
                  <div className=" h-full flex justify-center items-center">
                    <p className="text-center text-lg  text-main-primary">
                      {order.timestamp.split("T")[0]}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col">
                  <button
                    type="submit"
                    className="w-12 h-12 bg-main-moss text-main-primary font-motter flex justify-center items-center"
                  >
                    <img src="/icons/Reboot.png" className="w-10 h-10" alt="" />
                  </button>
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
      <div className=" fixed top-44 left-0  w-full h-full flex justify-center items-center opacity-15 bg-white blur-sm">
        <div className="w-32 h-32 bg-white "></div>
      </div>
    </>
  );
};

export default Page;
