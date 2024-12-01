"use client";

import React from "react";
import Link from "next/link";

const Hours: React.FC = () => {
  const scrollToBottom = () => {
    window.scrollTo({
      top: document.body.scrollHeight, // Scroll to bottom of page
      behavior: "smooth", // Smoother scroll
    });
  };

  return (
    <section className="w-full overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-2 w-full">
        {/* Left Section */}
        <div
          className="group flex flex-col justify-center items-center bg-main-primary text-center p-8 h-[50vh] md:h-[100vh] transition-transform duration-500 ease-in-out will-change-transform hover:scale-[1.05] relative"
          style={{
            backgroundImage: "none",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundImage =
              "url('/images/splitNav-left.jpg')")
          }
          onMouseLeave={(e) => (e.currentTarget.style.backgroundImage = "none")}
        >
          <Link href="/menu">
            <h2 className="font-motter text-4xl md:text-6xl lg:text-7xl text-main-secondary group-hover:text-white transition-all duration-300 cursor-pointer">
              Menu
            </h2>
          </Link>
          <p className="font-heart text-2xl md:text-3xl lg:text-4xl text-main-secondary group-hover:text-white transition-all duration-300 mt-4">
            Monday to Friday: 9:00 AM - 10:00 PM
          </p>
        </div>

        {/* Right Section */}
        <div
          className="group flex flex-col justify-center items-center bg-main-light text-center p-8 h-[50vh] md:h-[100vh] transition-transform duration-500 ease-in-out will-change-transform hover:scale-[1.05] relative"
          style={{
            backgroundImage: "none",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundImage =
              "url('/images/splitNav-right.jpg')")
          }
          onMouseLeave={(e) => (e.currentTarget.style.backgroundImage = "none")}
          onClick={scrollToBottom} // Scroll to bottom
        >
          <h2 className="font-motter text-4xl md:text-6xl lg:text-7xl text-main-moss group-hover:text-white transition-all duration-300 cursor-pointer">
            Hours
          </h2>
          <p className="font-heart text-2xl md:text-3xl lg:text-4xl text-main-moss group-hover:text-white transition-all duration-300 mt-4">
            Saturday to Sunday: 10:00 AM - 11:00 PM
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hours;
