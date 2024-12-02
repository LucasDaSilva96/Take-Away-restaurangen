"use client";

import React from "react";

const Contact: React.FC = () => {
  return (
    <section className="w-full min-h-screen bg-main-primary text-center py-16 px-8">
      <h1 className="text-main-secondary font-motter text-4xl md:text-6xl mb-8">
        Contact Us
      </h1>
      <p className="text-main-secondary text-lg md:text-xl mb-4">
        Cool street 1234, Sweden <br />
        Coolville 420
      </p>
      <p className="text-main-secondary text-lg md:text-xl mb-4">
        Phone:{" "}
        <a href="tel:+123456789" className="underline">
          +123 456 789
        </a>
      </p>
      <p className="text-main-secondary text-lg md:text-xl">
        Email:{" "}
        <a
          href="mailto:luckyfolk@pizza.sauce"
          className="underline hover:text-main-light"
        >
          luckyfolk@pizza.sauce
        </a>
      </p>
    </section>
  );
};

export default Contact;
