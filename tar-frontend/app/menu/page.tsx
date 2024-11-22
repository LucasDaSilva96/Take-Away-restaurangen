"use client";

import Menuloop from "@/components/Menu/Menuloop";
import Hero from "@/components/shared/Hero";
import React from "react";

export interface menuItemResponse {
  id: string;
  title: string;
  price: number;
  image: string;
  description: string;
  category: string;
  ingredients: string[];
  numberOfSales: number;
  onSale: boolean;
  quantity: number;
}

const page = () => {
  const title = ["Explore.", "Discover.", "Experience."];

  //Static menu items. To be replaced with db fetch
  const menuItems: menuItemResponse[] = [
    {
      id: "1",
      title: "Pasta",
      price: 10,
      image: "https://images.unsplash.com/photo-1606782042680-0b5f2b6f4c3c",
      description: "A delicious pasta dish",
      category: "main",
      ingredients: ["pasta", "tomato", "cheese"],
      numberOfSales: 10,
      onSale: false,
      quantity: 0,
    },
    {
      id: "2",
      title: "Pizza",
      price: 15,
      image: "https://images.unsplash.com/photo-1606782042680-0b5f2b6f4c3c",
      description: "A delicious pizza",
      category: "main",
      ingredients: ["dough", "tomato", "cheese"],
      numberOfSales: 10,
      onSale: false,
      quantity: 0,
    },
    {
      id: "3",
      title: "Salad",
      price: 5,
      image: "https://images.unsplash.com/photo-1606782042680-0b5f2b6f4c3c",
      description: "A delicious salad",
      category: "main",
      ingredients: ["lettuce", "tomato", "cheese"],
      numberOfSales: 10,
      onSale: false,
      quantity: 0,
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
          <Menuloop menu={menuItems} />
        </section>
      </section>
    </>
  );
};

export default page;
