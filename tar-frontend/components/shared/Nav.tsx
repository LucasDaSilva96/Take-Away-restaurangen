"use client";
import { useEffect, useState } from "react";
import ButtonBase from "./ButtonBase";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import useCart from "@/store/zustandstore";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

const Nav = () => {
  const router = useRouter();

  const path = usePathname();
  //Handle open menu

  const [small, setSmall] = useState(false);
  const [dash, setDash] = useState<boolean>(false);
  //Toggle open menu
  const toggleOpen = () => {
    toggleNav();
  };

  const { navOpen, toggleNav } = useCart();

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

  useEffect(() => {
    if (path.includes("/dashboard")) {
      setDash(true);
    } else {
      setDash(false);
    }
  }, [path]);

  //Menu Links
  const links = [
    { name: "Home", href: "/" },
    { name: "Menu", href: "/menu" },
    { name: "Hours", href: "/hours" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
    { name: "Log in", href: "/signIn" },
  ];

  //Roman Numerals for looping menu
  const romans = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"];

  if (dash) {
    return null;
  } else {
    return (
      <>
        {/* Navbar responsive */}
        <nav className="w-screen fixed top-0 left-0 flex justify-between items-center p-6 md:p-4 z-40">
          <div className=" hidden w-1/3 md:block">
            <p className="text-main-light">EAT</p>
          </div>
          <div className="w-20 md:w-1/3 flex justify-center items-center z-50">
            <div className="w-20">
              {/* Logo */}
              {
                <Link href={"/"}>
                  <svg
                    className="w-full fill-main-primary"
                    viewBox="0 0 390 194.32"
                  >
                    <g className="Logo__lucky">
                      <path d="M264.55,75.74c-1.45-6.47-2.56-21-2.78-35.25l.78-.67,12.83,35.92h40.38c-3.68-5.35-16.51-37.48-22.2-52.76l-.11-.33c6.84-5.75,12-10.1,16.66-14.24l20,44.47c-.45,7.92-1.34,15.73-3.57,23h42.28a101.91,101.91,0,0,1-3.13-22.65c1.9-4.57,16.51-39.15,24.32-50H366.46c-1,11.49-5.57,27.66-9,35.58-2.9-7.81-6.92-24.32-7-35.58H275c2.46,10.6-2.56,23.53-12.05,30.45l-1.22.89C262,22,263.22,9,264.89,3.24H224.51c1.22,7.25,2.12,21.75,2.12,34.24,0,15-1.12,31.13-2.68,38.27Z"></path>
                      <path d="M183.84,0c-29,0-46.18,15-46.18,39.94,0,24.1,16,38.48,43.84,38.48,15.06,0,27.89-3.46,35.58-9.15V40.05c-7.58,8.25-18.18,13.16-28.89,13.16-8.92,0-14.17-6.8-14.17-21.2,0-12.27,1.68-19.63,5.8-19.63,4.42,0,6.7,4.53,7.88,16.47l30.51-12.31C212.54,6,200.49,0,183.84,0Z"></path>
                      <path d="M60.07,53.1c0,18.29,17.4,25,39.6,25,20.75,0,34.81-6.58,34.81-24.77V20.41c0-7.92.33-13.27,1.11-17.18h-26c.89,4.35,1,9.49,1,17.07V52.43c0,8.92-2.56,12.94-7.36,12.94-4.58,0-7-4-7-12.94V20.3c0-7.81.11-12.94,1.45-17.07H58.06a65.94,65.94,0,0,1,2,17.52Z"></path>
                      <path d="M58.34,75.74l1.45-18.51A48.17,48.17,0,0,1,38.93,61.8V38c0-11.82,0-23.43,2-34.8H1.67c.9,11.49,1,22.65,1,34.25,0,12.49-.22,26.77-1.56,38.26Z"></path>
                    </g>
                    <g className="Logo__folks">
                      <path d="M362.22,108.58c-15.84-4.46-19.3-6.47-19.3-10s3-5.24,9.26-5.24c8.26,0,17,5.24,25,15.06l6.92-18.07c-7.92-5.36-20.64-8.59-33.36-8.59-23.31,0-37.93,9.7-37.93,25.21,0,12.83,6,21,22.43,25.77,15.39,4.57,20.52,7.25,20.52,10.93,0,3.35-2.79,4.57-9.59,4.57-9.48,0-19.86-6.47-26.44-17.07l-7,19.08c8.59,6,22.42,9.59,37.48,9.59,20.3,0,35-10.26,35-24.31C385.2,121.86,377.51,112.82,362.22,108.58Z"></path>
                      <path d="M291.61,103.9c9.7-8.15,15.95-13.5,22.42-19.41H273.2c2.45,10.6-2.57,23.53-12.05,30.45l-1.23.89c.23-12.6,1.45-25.55,3.13-31.35H222.67c1.23,7.26,2.12,21.76,2.12,34.25,0,15-1.12,31.12-2.68,38.26h40.61c-1.45-6.47-2.57-21-2.79-35.25l.78-.67L273.54,157h40.38c-3.68-5.35-16.51-37.48-22.2-52.76Z"></path>
                      <path d="M198.9,119.29c0-11.82,0-23.43,2-34.8H161.64c.9,11.49,1,22.65,1,34.25,0,12.49-.22,26.77-1.56,38.26h57.23l1.45-18.52a48.18,48.18,0,0,1-20.86,4.58Z"></path>
                      <path d="M109.77,81.7c-26.55,0-46,16.73-46,39.49,0,22.53,19.19,39,45.29,39s45.4-16.51,45.4-39C154.5,98.43,135.53,81.7,109.77,81.7ZM109,148.07c-4.8,0-8.26-11.27-8.26-26.77,0-15.84,3.57-27.44,8.48-27.44s8.37,11.6,8.37,27.44c0,15.39-3.68,26.77-8.59,26.77Z"></path>
                      <path d="M40.94,157c-2.23-8.25-2.9-16.62-3-26.54,7.47.11,15,.55,20.86,2.34v-18.3a101.28,101.28,0,0,1-21,2.23V97.2c9,.11,18.51,1.45,24.76,3.8L60.35,84.49H.56c2,11.49,2.12,22.64,2.12,34.24,0,12.5-.11,26.77-2.68,38.26Z"></path>
                    </g>
                    <g className="Logo__baseline">
                      <g className="Logo__play">
                        <path d="M377.66,185.21h0l-3-6.35h-4.11l5.19,9.75v5.7h3.89v-5.7l5.21-9.75h-4.11Z"></path>
                        <path d="M349.11,178.86l-5.6,15.46h3.89l1-3.22h5.3l1,3.22h3.88L353,178.86Zm.17,9.28,1.75-5.71h.05l1.75,5.71Z"></path>
                        <path d="M322,178.86h-3.9v15.45h10.77v-3.17H322Z"></path>
                        <path d="M297.47,178.86H290v15.45h3.89v-5.6h3.61c3.22,0,5.23-1.68,5.23-4.93S300.69,178.86,297.47,178.86Zm-.82,6.68h-2.79V182h2.79c1.34,0,2.16.45,2.16,1.75s-.82,1.75-2.16,1.75Z"></path>
                      </g>
                      <path d="M267.1,184.71c-.15-1-.25-1.57-1-1.57-.38,0-.49.1-1.24,1-.2.26-.76.86-1,.86-.06,0-.13,0-.13-.17,0-.43,1.06-2.2,1.06-2.53s-.2-.75-.68-.75c-.23,0-.84.1-1.59.1s-1.44-.1-1.59-.1c-.5,0-.68.6-.68.75,0,.36,1.06,2.1,1.06,2.53,0,.07,0,.17-.13.17-.33,0-1-.83-1-.86-.79-.9-.86-1-1.24-1a.82.82,0,0,0-.73.38,13.21,13.21,0,0,0-.48,1.95,11.83,11.83,0,0,0-.4,1.28v0a.88.88,0,0,0,.83.76c.33,0,1.54-.4,2-.4.15,0,.47,0,.47.2s-.4.4-1.38.88-1.11.53-1.11,1a.7.7,0,0,0,.37.63,10.63,10.63,0,0,1,1.47,1c.6.53.86.74,1.13.74.81,0,.91-.84,1-1.57.13-.88.2-1.34.46-1.34.1,0,.17.18.2.28s.25,1.49.27,1.69a1.1,1.1,0,0,0,.94.94,1,1,0,0,0,.55-.26c.2-.15,1.14-.91,1.37-1.06.93-.6,1.06-.75,1.06-1.06,0-.53-.3-.65-1.11-1-.59-.25-1.39-.63-1.39-.91,0-.13.28-.18.45-.18.33,0,1.84.4,2.07.4a.87.87,0,0,0,.78-.73,2.07,2.07,0,0,0-.22-.76A6.08,6.08,0,0,1,267.1,184.71Z"></path>
                      <g className="Logo__drink">
                        <path d="M125,178.86H118.1v15.45h7.06c4.3,0,6.68-2.74,6.68-7.71S129.25,178.86,125,178.86Zm-.39,12.28H122V182h2.57c2.42,0,3.39,1.75,3.39,4.56s-1,4.54-3.39,4.54Z"></path>
                        <path d="M157.05,187.18v-.05a3.66,3.66,0,0,0,3.13-3.78c0-2.92-2.07-4.5-5.51-4.5h-7.28v15.46h3.89v-5.38h2.42c3.3,0,1.9,4.73,2.66,5.38h4v-.21C159.51,193.84,160.92,187.85,157.05,187.18Zm-3.14-1.43h-2.63V182h2.63c1.56,0,2.38.56,2.38,1.85S155.47,185.75,153.91,185.75Z"></path>
                        <rect
                          x="175.96"
                          y="178.86"
                          width="3.89"
                          height="15.45"
                        ></rect>
                        <path d="M205.35,188.05h0l-5.4-9.19H196v15.45h3.89v-9.18h0l5.4,9.18h3.89V178.86h-3.89Z"></path>
                        <path d="M239.22,178.86h-4.54l-5.38,6.27v-6.27h-3.89v15.45h3.89v-4.08l1.56-1.77,4,5.85h4.54l-6.1-8.64Z"></path>
                      </g>
                      <path d="M96.47,184.71c-.15-1-.25-1.57-1-1.57-.38,0-.48.1-1.23,1-.2.26-.76.86-1,.86a.15.15,0,0,1-.13-.17c0-.43,1.06-2.2,1.06-2.53s-.2-.75-.68-.75c-.22,0-.83.1-1.59.1s-1.44-.1-1.59-.1c-.5,0-.68.6-.68.75,0,.36,1.06,2.1,1.06,2.53,0,.07,0,.17-.12.17-.33,0-1-.83-1-.86-.78-.9-.86-1-1.23-1a.84.84,0,0,0-.74.38,14.57,14.57,0,0,0-.47,1.95,10,10,0,0,0-.4,1.28v0a.87.87,0,0,0,.83.76c.33,0,1.54-.4,2-.4.15,0,.48,0,.48.2s-.4.4-1.39.88-1.11.53-1.11,1a.73.73,0,0,0,.38.63,10.63,10.63,0,0,1,1.47,1c.6.53.85.74,1.13.74.81,0,.91-.84,1-1.57.13-.88.2-1.34.45-1.34.1,0,.18.18.2.28s.26,1.49.28,1.69a1.1,1.1,0,0,0,.94.94,1.08,1.08,0,0,0,.55-.26c.2-.15,1.14-.91,1.36-1.06.94-.6,1.06-.75,1.06-1.06,0-.53-.3-.65-1.11-1-.58-.25-1.38-.63-1.38-.91,0-.13.27-.18.45-.18.33,0,1.84.4,2.07.4a.89.89,0,0,0,.78-.73,2.3,2.3,0,0,0-.23-.76A6.08,6.08,0,0,1,96.47,184.71Z"></path>
                      <g className="Logo__eat">
                        <path d="M54.31,182h4.5v12.27H62.7V182h4.48v-3.18H54.31Z"></path>
                        <path d="M32.35,178.86l-5.6,15.46h3.89l1-3.22h5.3l1,3.22h3.89l-5.58-15.46Zm.18,9.28,1.75-5.71h0l1.75,5.71Z"></path>
                        <path d="M4,188h6.74v-3.17H4V182h7.82v-3.18H.1v15.45H12v-3.17H4Z"></path>
                      </g>
                    </g>
                  </svg>
                </Link>
              }
            </div>
          </div>

          {/* Navbar Buttons */}
          <section className="flex justify-center items-center gap-2 md:w-1/3 md:justify-end">
            <motion.section
              initial={{ opacity: 1 }}
              animate={{ opacity: navOpen ? 0 : 1 }}
              transition={{ duration: 0.3 }}
            >
              <Link href={"/menu"}>
                <ButtonBase
                  text="Order now"
                  classname=" text-main-light bg-main-secondary z-0 hover:scale-105 transition-all ease-in-out duration-300"
                />
              </Link>
            </motion.section>

            {/* Animated menu button */}
            <button
              onClick={toggleOpen}
              className="p-2 w-11 z-50 aspect-square bg-main-primary rounded-md flex justify-center items-center flex-col gap-1 hover:scale-105 transition-all ease-in-out duration-300"
            >
              <motion.span
                animate={{
                  rotate: navOpen ? 45 : 0,
                  y: navOpen ? 0 : 8,
                }}
                transition={{ duration: 0.3 }}
                className="absolute w-6 h-1 bg-main-light rounded"
              />
              <motion.span
                animate={{
                  opacity: navOpen ? 0 : 1,
                }}
                transition={{ duration: 0.3 }}
                className="w-6 h-1 bg-main-light rounded"
              />
              <motion.span
                animate={{
                  rotate: navOpen ? -45 : 0,
                  y: navOpen ? 0 : -8,
                }}
                transition={{ duration: 0.3 }}
                className="absolute w-6 h-1 bg-main-light rounded"
              />
            </button>
          </section>
        </nav>
        {/* Menu popout */}
        <AnimatePresence>
          {navOpen && (
            <motion.section className="w-screen h-screen fixed top-0 left-0 bg-transparent z-30">
              {/* Background darkner also closes menu on click */}
              <motion.section
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                onClick={toggleOpen}
                className="inset-0 w-full h-full bg-black bg-opacity-45"
                id="bg"
              ></motion.section>

              {/* Menu */}
              <motion.section
                initial={{ x: small ? "100%" : "200%" }}
                animate={{ x: small ? "0%" : "100%" }}
                exit={{ x: small ? "100%" : "200%" }}
                transition={{ duration: 0.3, ease: "circInOut" }}
                className=" w-screen lg:w-6/12 h-screen flex flex-col gap-20 z-20 justify-center items-center bg-main-moss absolute top-0 before:bg-top before:bg-no-repeat before:bg-[url('/images/noise2.png')] before:bg-[length:100%_auto] before:content-[''] before:block before:h-full before:left-0 before:pointer-events-none before:absolute before:top-0 before:w-full before:z-0"
                id="menu"
              >
                {/* Admin login button */}
                <button
                  onClick={() => router.push("/signin-admin")}
                  className="absolute bottom-5 right-5 w-12 h-12 border-2 border-main-primary rounded-full hover:scale-105 transition-all duration-300"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      {" "}
                      <path
                        d="M4 21C4 17.4735 6.60771 14.5561 10 14.0709M19.8726 15.2038C19.8044 15.2079 19.7357 15.21 19.6667 15.21C18.6422 15.21 17.7077 14.7524 17 14C16.2923 14.7524 15.3578 15.2099 14.3333 15.2099C14.2643 15.2099 14.1956 15.2078 14.1274 15.2037C14.0442 15.5853 14 15.9855 14 16.3979C14 18.6121 15.2748 20.4725 17 21C18.7252 20.4725 20 18.6121 20 16.3979C20 15.9855 19.9558 15.5853 19.8726 15.2038ZM15 7C15 9.20914 13.2091 11 11 11C8.79086 11 7 9.20914 7 7C7 4.79086 8.79086 3 11 3C13.2091 3 15 4.79086 15 7Z"
                        stroke="#EBA13D"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>{" "}
                    </g>
                  </svg>
                </button>
                <section className="flex flex-col justify-center items-center gap-4  ">
                  {/* Menu Links with romans */}
                  {links.map((link, index) => (
                    <section
                      className="text-center flex flex-col"
                      key={link + index.toString()}
                    >
                      <motion.p
                        initial={{ opacity: 0, x: "-200%" }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 0.2 + index * 0.1 }}
                        className="text-lg md:text-xl text-main-light font-serif"
                      >
                        {romans[index]}
                      </motion.p>
                      <section className="group">
                        <motion.p
                          initial={{ opacity: 0, x: "100%" }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{
                            duration: 0.5,
                            delay: index * 0.05,
                            ease: "backInOut",
                          }}
                          onClick={toggleOpen}
                          className="text-main-primary hover:text-main-light cursor-pointer"
                        >
                          <Link
                            key={index}
                            href={link.href}
                            className="text-4xl md:text-6xl font-motter transition-all ease-in-out duration-300"
                          >
                            {link.name}
                          </Link>
                        </motion.p>
                        <div className="w-0 group-hover:w-full h-1 bg-main-light transition-all rounded-md ease-in-out duration-300"></div>
                      </section>
                    </section>
                  ))}
                </section>
                <motion.section
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 1 }}
                >
                  <ButtonBase
                    text="Order now"
                    classname="bg-main-secondary text-main-light hover:scale-105 transition-all ease-in-out duration-300"
                  />
                </motion.section>
              </motion.section>
            </motion.section>
          )}
        </AnimatePresence>
      </>
    );
  }
};

export default Nav;
