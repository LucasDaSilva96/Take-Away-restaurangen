import React from "react";
import Link from "next/link";

const links = [
  { href: "/menu", label: "menu" },
  { href: "/hours", label: "hours" },
  { href: "/about", label: "vision" },
];

export const SectionB = () => {
  return (
    <div className="bg-main-light py-24 ">
      <div className="flex justify-center mb-32">
        <img src="/icons/Horse.png" alt="" className="w-5" />
      </div>
      <div className="flex justify-center items-center flex-col gap-20 font-motter text-main-primary text-2xl  text-center ">
        <div className="max-w-[90%] md:max-w-2xl px-5">
          <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl break-words mb-10">
            Ready to experience our pizzas?
          </h3>
          <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl break-words">
            Checkout the{" "}
            {links.map((link, index) => (
              <React.Fragment key={link.href}>
                <Link href={link.href}>{link.label}</Link>
                {index < links.length - 1 && ", "}
                {index === links.length - 2 && " and our "}
              </React.Fragment>
            ))}
            .
          </h3>
        </div>
      </div>
      <div className="flex justify-center mt-32">
        <img src="/icons/darts.png" alt="" className="w-7" />
      </div>
    </div>
  );
};
