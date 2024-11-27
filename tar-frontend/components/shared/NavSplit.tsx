import React from "react";
import Link from "next/link";
const NavSplit: React.FC = () => {
  return (
    <section className="w-full">
      {/* Grid Layout for Menu and Hours */}
      <div className="grid grid-cols-1 md:grid-cols-2 w-full">
        {/* Left Section - MENU */}
        <div className="flex flex-col justify-center items-center bg-main-primary text-center p-8 h-[50vh] md:h-[100vh]">
          <p className="font-heart text-lg md:text-2xl text-main-secondary">
            See what we offer and at what cost
          </p>
          <Link href="/menu">
            <h2 className="font-motter text-4xl md:text-6xl  text-main-secondary mt-4 cursor-pointer hover:underline">
              MENU
            </h2>
          </Link>
        </div>

        {/* Right Section - HOURS */}
        <div className="flex flex-col justify-center items-center bg-main-light text-center p-8 h-[50vh] md:h-[100vh]">
          <p className="font-heart text-lg md:text-2xl text-main-moss">
            Want to know when we are open
          </p>
          <h2 className="font-motter text-4xl md:text-6xl  text-main-moss mt-4">
            HOURS
          </h2>
        </div>
      </div>
    </section>
  );
};

export default NavSplit;
