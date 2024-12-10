"use client";

import React from "react";
import Footer from "@/components/shared/Footer"; // Korrekt import för footern

const Hours: React.FC = () => {
  const hero_video =
    "https://www.luckyfolks.fr/wp-content/uploads/2022/03/lucky-folks-pub-2021-v2-1.mp4";

  return (
    <>
      <section className="relative w-full min-h-screen text-center bg-main-secondaryLight">
        {/* Background Video */}
        <div className="absolute inset-0 overflow-hidden">
          <video
            src={hero_video}
            autoPlay
            loop
            muted
            className="absolute inset-0 w-full h-full object-cover"
          ></video>
        </div>

        {/* Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>

        {/* Content */}
        <div className="relative flex flex-col justify-center items-center h-screen px-8">
          <h1 className="text-main-primary font-motter text-5xl md:text-7xl mb-8">
            Welcome
          </h1>
          <p className="text-main-primary text-xl md:text-2xl">
            Mon - Sunday: 09:00 - 24:00
          </p>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </>
  );
};

export default Hours;
