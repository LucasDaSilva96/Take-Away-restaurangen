import React from "react";

interface HeroProps {
  title?: string;
  description: string;
  homePage?: boolean;
}

const Hero: React.FC<HeroProps> = ({ title, description, homePage }) => {
  return (
    <article className="w-screen h-auto flex justify-center items-center">
      <div className="text-main-primary font-motter">
        {!homePage && (
          <p className="text-xl uppercase font-alumni text-center">
            {description}
          </p>
        )}
        <h1 className="flex flex-col text-center font-s text-6xl">
          <span>DRINK.</span>
          <span>EAT.</span>
          <span>RELAX.</span>
        </h1>
        {homePage && (
          <p className="text-xl uppercase font-alumni text-center">
            {description}
          </p>
        )}
      </div>
    </article>
  );
};

export default Hero;
