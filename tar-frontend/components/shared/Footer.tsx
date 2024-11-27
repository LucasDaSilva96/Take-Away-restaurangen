import React from "react";
import Link from "next/link";
import ButtonBase from "./ButtonBase";

const Footer: React.FC = () => {
  return (
    <section className="w-full bg-main-secondary text-center py-12 px-8">
      {/* Ready to order */}
      <div className="mb-12">
        <h2 className="font-motter text-4xl md:text-6xl text-main-primary mb-4">
          Ready to order?
        </h2>
        <ButtonBase
          text="Place order"
          classname="bg-main-primary text-white hover:bg-main-light py-3 px-8 rounded-lg text-lg md:text-xl"
        />
        <p className="text-main-primary text-sm md:text-base mt-4">
          All pizzas are made to order. Wait times vary.
        </p>
      </div>

      {/* FAQ Section */}
      <div className="mb-12">
        <h3 className="font-motter text-2xl md:text-3xl text-main-primary mb-2">
          Got questions?
        </h3>
        <Link
          href="/faq"
          className="font-motter text-main-light underline text-xl md:text-2xl hover:text-main-secondary"
        >
          Go to FAQ
        </Link>
      </div>

      {/* Email Form */}
      <div className="mb-12">
        <p className="text-main-light text-lg md:text-xl mb-4">
          Inquiries, Catering, Complaints ...
        </p>
        <form className="flex items-center justify-center">
          <div className="flex items-stretch border border-main-secondary rounded-md overflow-hidden">
            {/*Inputfield with rounded corner on left side*/}
            <input
              type="email"
              placeholder="Your email"
              className="py-2 px-4 flex-grow text-main-secondary text-base md:text-lg focus:outline-none rounded-l-md"
            />
            {/* Button with rounded corners on right side */}
            <button
              type="submit"
              className="bg-main-primary text-white px-6 text-base md:text-lg hover:bg-main-light rounded-r-md"
            >
              OK
            </button>
          </div>
        </form>

        <p className="text-main-light text-sm mt-4">
          By sending an email you accept our terms and conditions
        </p>
      </div>

      {/* Footer Section */}
      <div>
        <div className="flex items-center justify-center">
          {/* Left border line */}
          <div className="flex-grow border-t border-main-primary"></div>

          {/* "LUCKY FOLKS" on separate lines */}
          <div className="px-4 text-main-primary text-lg font-motter text-center">
            <p>LUCKY</p>
            <p>FOLKS</p>
          </div>

          {/* Right border line */}
          <div className="flex-grow border-t border-main-primary"></div>
        </div>

        {/* Contact information */}
        <p className="text-main-primary text-sm mt-4">
          +123 456 789 <br />
          Cool street 1234, Sweden <br />
          Coolville 420
        </p>
        <div className="flex justify-center gap-4 mt-4">
          <a href="#" className="text-main-primary text-xl">
            <i className="fab fa-facebook"></i>
          </a>
          <a href="#" className="text-main-primary text-xl">
            <i className="fab fa-instagram"></i>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Footer;
