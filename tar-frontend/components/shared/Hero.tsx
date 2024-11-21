import React from "react";

interface HeroProps {
  title: string[]; // Put every word in the title in a array string so that you can render it in the span element
  description: string; // Put the smal description that is above or under the title.
  homePage?: boolean; // boolean that tells the code if you are in the homepage. Purpose is that the description text is above the title in every page except homepage
  className?: string; // props to change the background img
}

// A dynamic hero component wich we can later use as a props and change
// the text contain depending on wich page you are on.

const Hero: React.FC<HeroProps> = ({
  title,
  description,
  homePage,
  className,
}) => {
  return (
    <section
      className={`w-screen h-full flex z-10 relative justify-center items-center ${className}`}
    >
      <div className="text-main-primary font-motter">
        {!homePage && (
          <p className="text-xl uppercase font-alumni text-center">
            {description}
          </p>
        )}
        <h1 className="flex flex-col text-center font-s text-6xl">
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
