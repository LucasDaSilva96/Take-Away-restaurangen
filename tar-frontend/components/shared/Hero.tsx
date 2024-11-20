import React from "react";

const Hero = () => {
  return (
    <article className="w-screen h-auto flex justify-center items-center">
      <div className="text-main-primary font-motter">
        <h1 className="flex flex-col text-center font-s text-6xl">
          <span>DRINK.</span>
          <span>EAT.</span>
          <span>RELAX.</span>
        </h1>
        <p className="text-xl uppercase font-alumni text-center">
          Pizza like you never had it
        </p>
      </div>
    </article>
  );
};

export default Hero;
