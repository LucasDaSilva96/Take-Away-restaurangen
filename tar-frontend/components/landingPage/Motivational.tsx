"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
const links = [
  { href: "/menu", label: "menu" },
  { href: "/hours", label: "hours" }, // Updated href for hours page
  { href: "/about", label: "vision" },
];

const Motivational = () => {
  return (
    <div
      className="bg-main-light py-24 bg-cover bg-center relative"
      style={{
        backgroundImage: "url('/images/pizza-oven 2.png')", // Background image for the section
      }}
    >
      {/* Overlay for better text visibility */}
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>

      {/* Top icon */}
      <div className="relative flex justify-center mb-32">
        <Image src="/icons/Horse.png" alt="Horse Icon" width={20} height={20} />
      </div>

      {/* Main content */}
      <div className="relative flex justify-center items-center flex-col gap-20 font-motter text-main-primary text-2xl text-center">
        <div className="max-w-[90%] md:max-w-2xl px-5">
          {/* Motivational heading */}
          <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl break-words mb-10 text-white">
            Ready to experience our pizzas?
          </h3>

          {/* Links to sections */}
          <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl break-words text-white">
            Checkout the{" "}
            {links.map((link, index) => (
              <React.Fragment key={link.href}>
                <Link
                  href={link.href}
                  className="underline hover:text-main-light"
                >
                  {link.label}
                </Link>
                {index < links.length - 1 && ", "}
                {index === links.length - 2 && " and our "}
              </React.Fragment>
            ))}
            .
          </h3>
        </div>
      </div>

      {/* Bottom icon */}
      <div className="relative flex justify-center mt-32">
        <Image src="/icons/darts.png" alt="Darts Icon" width={28} height={28} />
      </div>
    </div>
  );
};

export default Motivational;
