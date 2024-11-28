"use client";

import { getMenuItems } from "@/components/Menu/Getter";
import Menuloop from "@/components/Menu/Menuloop";
import Hero from "@/components/shared/Hero";
import React, { useEffect, useState } from "react";

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

const Page = () => {
  const title = ["Explore.", "Discover.", "Experience."];

  const [menuItems, setMenuItems] = useState<menuItemResponse[]>([]);

  useEffect(() => {
    const fetchMenuItems = async () => {
      const items = await getMenuItems();
      setMenuItems(items);
    };


    console.log("Running")

    fetchMenuItems();
  }, []);

  return (
    <>
      <Hero
        title={title}
        description="Try something new"
        video="https://www.luckyfolks.fr/wp-content/uploads/2022/03/lucky-folks-pub-2021-v2-1.mp4"
      />
      <section className="w-screen min-h-screen flex flex-col p-6 pt-20 bg-main-secondaryLight">
        <section className="w-full flex justify-center items-center text-center">
          <h3 className="font-motter text-4xl md:text-5xl lg:text-6xl text-main-primary">
            The Menu
          </h3>
        </section>

        <section className="w-full flex justify-center items-center">
          {/* Filter */}
          {menuItems && <Menuloop menu={menuItems} />}
        </section>
      </section>
    </>
  );
};

export default Page;
