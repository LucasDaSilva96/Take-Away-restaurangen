import React from "react";
import Image from "next/image";

// Define the props interface for the component
interface SectionAProps {
  className?: string; // Optional CSS class
  description: string; // Description text for the left column
}

// Functional component for SectionA
const SectionA: React.FC<SectionAProps> = ({ className, description }) => {
  // Right column hardcoded text
  const rightText =
    "Feeling snacky and looking for something truly satisfying? Let us take you on a journey of delicious flavors with our expertly crafted pizzas. Made with the freshest ingredients, every slice is packed with bold, irresistible tastes that will leave your taste buds dancing. Whether you love the comfort of a classic or the excitement of something new, our menu has something to satisfy every craving. From the first bite to the last, experience the joy and magic of great pizza like never before. Don’t wait—your perfect slice is calling!";

  return (
    // Main section wrapper
    <section
      className={`w-screen min-h-screen flex flex-col items-center px-8 py-12 bg-main-secondaryLight ${className}`}
      // Inline background color
    >
      {/* Text Content */}
      <div className="max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-12 text-main-primary mb-12">
        {/* Left Column */}
        <div className="font-motter">
          <p
            className="text-[30.62px] leading-[36.74px]"
            style={{
              fontWeight: 400, // Set font weight for left coluumn
            }}
          >
            {description} {/* Left column text from props */}
          </p>
        </div>
        {/* ´Right Column */}
        <div className="font-alumni">
          <p className="text-base md:text-lg leading-relaxed break-words">
            {rightText} {/* Hardcoded text for right column */}
          </p>
        </div>
      </div>

      {/* Optimized Image */}
      <div className="w-full max-w-6xl">
        <Image
          src="/images/sectionA.jpeg" // Path to image in public folder
          alt="Section A" // Alt text for accessibility
          width={1200} // Image width
          height={800} // Image height
          className="rounded-lg shadow-lg" // Rounded corners and shadow
        />
      </div>
    </section>
  );
};

export default SectionA; // Export the component
