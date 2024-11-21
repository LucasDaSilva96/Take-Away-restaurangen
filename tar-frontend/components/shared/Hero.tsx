import React from "react";

interface HeroProps {
  title: string[];
  description: string;
  homePage?: boolean;
  className?: string;
}

const Hero: React.FC<HeroProps> = ({
  title,
  description,
  homePage,
  className,
}) => {
  return (
    <section
      className={`w-screen h-screen flex justify-center items-center ${className}`}
    >
      <div className="text-main-primary font-motter">
        {!homePage && (
          <p className="text-xl uppercase font-alumni text-center">
            {description}
          </p>
        )}
        <h1 className="flex flex-col text-center font-s text-4xl md:text-6xl">
          {title.map((str, index) => (
            <span key={index + str}>{str}</span>
          ))}
        </h1>
        {homePage && (
          <p className="text-xl uppercase font-alumni text-center">
            {description}
          </p>
        )}
      </div>
    </section>
  );
};

export default Hero;
