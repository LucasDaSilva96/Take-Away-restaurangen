"use client";

import useCart from "@/store/zustandstore";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import ButtonBase from "./ButtonBase";
import Link from "next/link";

const Cartoverlay = () => {
  // States from zustand
  const {
    cart,
    addToCart,
    clearCart,
    removeFromCart,
    total,
    amount,
    menuOpen,
    toggleMenu,
    getQuantity,
    clearItemFromCart,
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
          <motion.section className="w-screen h-screen fixed top-0 left-0 bg-transparent">
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
                        <article
                          key={item.id}
                          className="w-full flex justify-between rounded-md items-center p-4 border-2 border-main-primary"
                        >
                          <div className="flex justify-center items-center w-1/4">
                            <p className="text-main-primary font-motter">
                              {item.title}
                            </p>
                          </div>

                          <section className="flex justify-center items-center gap-2 font-motter w-1/4 text-2xl">
                            <button
                              onClick={() => removeFromCart(item)}
                              className="border-none bg-transparent text-main-primary"
                            >
                              -
                            </button>
                            <button className="border-none bg-transparent text-main-primary">
                              {getQuantity(item.id)}
                            </button>
                            <button
                              onClick={() => addToCart(item)}
                              className="border-none bg-transparent text-main-primary"
                            >
                              +
                            </button>
                          </section>
                          <section className="w-1/4">
                            <p className="text-main-primary font-motter">
                              {item.price}€ x {getQuantity(item.id)}
                            </p>
                          </section>
                          <button
                            onClick={() => clearItemFromCart(item.id)}
                            className="w-10 h-10"
                          >
                            <svg
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                              <g
                                id="SVGRepo_tracerCarrier"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              ></g>
                              <g id="SVGRepo_iconCarrier">
                                {" "}
                                <path
                                  d="M10 12L14 16M14 12L10 16M18 6L17.1991 18.0129C17.129 19.065 17.0939 19.5911 16.8667 19.99C16.6666 20.3412 16.3648 20.6235 16.0011 20.7998C15.588 21 15.0607 21 14.0062 21H9.99377C8.93927 21 8.41202 21 7.99889 20.7998C7.63517 20.6235 7.33339 20.3412 7.13332 19.99C6.90607 19.5911 6.871 19.065 6.80086 18.0129L6 6M4 6H20M16 6L15.7294 5.18807C15.4671 4.40125 15.3359 4.00784 15.0927 3.71698C14.8779 3.46013 14.6021 3.26132 14.2905 3.13878C13.9376 3 13.523 3 12.6936 3H11.3064C10.477 3 10.0624 3 9.70951 3.13878C9.39792 3.26132 9.12208 3.46013 8.90729 3.71698C8.66405 4.00784 8.53292 4.40125 8.27064 5.18807L8 6"
                                  stroke="#B42638"
                                  stroke-width="2"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                ></path>{" "}
                              </g>
                            </svg>
                          </button>
                        </article>
                      ))}
                    </section>
                    <section className="w-full flex justify-between items-center p-4">
                      <ButtonBase
                        text="Place order"
                        classname="bg-main-primary text-main-light md:text-xl"
                      />

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
