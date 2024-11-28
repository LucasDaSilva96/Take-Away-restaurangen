"use client";

import useCart from "@/store/zustandstore";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import ButtonBase from "./ButtonBase";
import Link from "next/link";
import ItemInCart from "@/components/shared/ItemInCart";

const Cartoverlay = () => {
  // States from zustand
  const {
    cart,
    clearCart,
    total,
    amount,
    menuOpen,
    toggleMenu,
  } = useCart();
  const [small, setSmall] = useState(false);

  //Toggle open menu
  const toggleOpen = () => {
    toggleMenu();
  };

  useEffect(() => {
    //Check if screen is small to animate menu correctly
    const isSmall = () => {
      if (window.innerWidth <= 1024) {
        setSmall(true);
      } else {
        setSmall(false);
      }
    };

    isSmall();

    window.addEventListener("resize", isSmall);

    return () => {
      window.removeEventListener("resize", isSmall);
    };
  }, []);

  return (
    <>
      <button
        onClick={toggleOpen}
        className="fixed bottom-5 right-5 w-20 h-20 bg-main-secondary p-4 rounded-full shadow-lg hover:scale-105 transition-all duration-300 z-10"
      >
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            {" "}
            <path
              d="M3.864 16.4552C4.40967 18.6379 4.68251 19.7292 5.49629 20.3646C6.31008 21 7.435 21 9.68486 21H14.3155C16.5654 21 17.6903 21 18.5041 20.3646C19.3179 19.7292 19.5907 18.6379 20.1364 16.4552C20.9943 13.0234 21.4233 11.3075 20.5225 10.1538C19.6217 9 17.853 9 14.3155 9H9.68486C6.14745 9 4.37875 9 3.47791 10.1538C2.94912 10.831 2.87855 11.702 3.08398 13"
              stroke="#EFE1D9"
              strokeWidth="1.5"
              strokeLinecap="round"
            ></path>{" "}
            <path
              d="M19.5 9.5L18.7896 6.89465C18.5157 5.89005 18.3787 5.38775 18.0978 5.00946C17.818 4.63273 17.4378 4.34234 17.0008 4.17152C16.5619 4 16.0413 4 15 4M4.5 9.5L5.2104 6.89465C5.48432 5.89005 5.62128 5.38775 5.90221 5.00946C6.18199 4.63273 6.56216 4.34234 6.99922 4.17152C7.43808 4 7.95872 4 9 4"
              stroke="#EFE1D9"
              strokeWidth="1.5"
            ></path>{" "}
            <path
              d="M9 4C9 3.44772 9.44772 3 10 3H14C14.5523 3 15 3.44772 15 4C15 4.55228 14.5523 5 14 5H10C9.44772 5 9 4.55228 9 4Z"
              stroke="#EFE1D9"
              strokeWidth="1.5"
            ></path>{" "}
          </g>
        </svg>

        {/**Display amount of cart entries */}
        <AnimatePresence>
          {total > 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ duration: 0.3, ease: "backInOut" }}
              className="absolute w-6 h-6 bg-main-primary rounded-full bottom-14 right-2"
            >
              <p className="text-main-light font-motter">{total}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </button>

      {/** Cart overlay with current contents */}
      <AnimatePresence>
        {menuOpen && (
          <motion.section className="w-screen h-screen fixed top-0 left-0 bg-transparent z-30">
            {/* Background darkner also closes menu on click */}
            <motion.section
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={toggleOpen}
              className="inset-0  w-full h-full bg-black bg-opacity-45"
              id="bg"
            ></motion.section>

            {/* Menu */}
            <motion.section
              initial={{ x: small ? "100%" : "200%" }}
              animate={{ x: small ? "0%" : "100%" }}
              exit={{ x: small ? "100%" : "200%" }}
              transition={{ duration: 0.3, ease: "circInOut" }}
              className="z-30 w-screen lg:w-6/12 min-h-screen flex flex-col gap-20 justify-center items-center bg-main-light absolute top-0 "
              id="menu"
            >
              <section className="w-full md:p-6">
                {cart && cart.length > 0 && (
                  <>
                    <section className="w-full flex justify-between items-center p-4">
                      <p className="font-motter text-main-primary md:text-3xl">
                        Current order
                      </p>
                      <button
                        onClick={clearCart}
                        className="border-2 border-main-secondaryLight text-main-secondaryLight rounded-md p-1"
                      >
                        Clear cart
                      </button>
                    </section>
                    <section className=" flex flex-col gap-2 p-4">
                      {cart.map((item) => (
                       <ItemInCart key={item.id} item={item} />
                      ))}
                    </section>
                    <section className="w-full flex justify-between items-center p-4">
                      <Link href={"/order"} onClick={toggleOpen}>
                      <ButtonBase
                        text="Place order"
                        classname="bg-main-primary text-main-light md:text-xl"
                      />
                      </Link>

                      <p className="font-motter text-main-primary md:text-xl">
                        Total: {amount}€
                      </p>
                    </section>
                  </>
                )}

                {cart && cart.length == 0 && (
                  <p className="text-main-primary font-motter text-xl md:text-3xl text-center">
                    Cart empty. <br /> Check out the{" "}
                    <Link
                      onClick={toggleOpen}
                      className="underline hover:text-main-secondary transition-all duration-300"
                      href={"/menu"}
                    >
                      Menu
                    </Link>
                  </p>
                )}
              </section>
            </motion.section>
          </motion.section>
        )}
      </AnimatePresence>
    </>
  );
};

export default Cartoverlay;
