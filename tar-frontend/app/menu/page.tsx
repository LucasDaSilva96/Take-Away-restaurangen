"use client";

import Menuloop from "@/components/Menu/Menuloop";
import Hero from "@/components/shared/Hero";
import React from "react";

const page = () => {
  const title = ["Explore.", "Discover.", "Experience."];

  const menu = [
    {
      name: "Pizza Klaus",
      description:
        "A delicious pizza with tomato sauce, mozzarella, and pepperoni.",
      price: 12.99,
      image:
        "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      category: "Pizza",
      contains: ["Gluten", "Dairy", "Eggs"],
    },
    {
      name: "Pizza Klaus",
      description:
        "A delicious pizza with tomato sauce, mozzarella, and pepperoni.",
      price: 12.99,
      image:
        "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      category: "Pizza",
      contains: ["Gluten", "Dairy", "Eggs"],
    },
    {
      name: "Pizza Klaus",
      description:
        "A delicious pizza with tomato sauce, mozzarella, and pepperoni.",
      price: 12.99,
      image:
        "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      category: "Pizza",
      contains: ["Gluten", "Dairy", "Eggs"],
    },
    {
      name: "Pizza Klaus",
      description:
        "A delicious pizza with tomato sauce, mozzarella, and pepperoni.",
      price: 12.99,
      image:
        "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      category: "Pizza",
      contains: ["Gluten", "Dairy", "Eggs"],
    },
    {
      name: "Pizza Klaus",
      description:
        "A delicious pizza with tomato sauce, mozzarella, and pepperoni.",
      price: 12.99,
      image:
        "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      category: "Pizza",
      contains: ["Gluten", "Dairy", "Eggs"],
    },
    {
      name: "Pizza Klaus",
      description:
        "A delicious pizza with tomato sauce, mozzarella, and pepperoni.",
      price: 12.99,
      image:
        "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      category: "Pizza",
      contains: ["Gluten", "Dairy", "Eggs"],
    },
    {
      name: "Pizza Klaus",
      description:
        "A delicious pizza with tomato sauce, mozzarella, and pepperoni.",
      price: 12.99,
      image:
        "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      category: "Pizza",
      contains: ["Gluten", "Dairy", "Eggs"],
    },
  ];

  return (
    <>
      <Hero title={title} description="Try something new" />
      <section className="w-screen min-h-screen flex flex-col p-6 pt-20 bg-main-secondaryLight">
        <section className="w-full flex justify-center items-center text-center">
          <h3 className="font-motter text-4xl md:text-5xl lg:text-6xl text-main-primary">
            The Menu
          </h3>
        </section>

        <section className="w-full flex justify-center items-center">
          {/* Filter */}
          <Menuloop menu={menu} />
        </section>
      </section>
    </>
  );
};

export default page;
