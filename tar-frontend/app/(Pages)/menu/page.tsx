"use client";

import Filter from "@/components/Menu/Filter";
import Menuloop from "@/components/Menu/Menuloop";
import Hero from "@/components/shared/Hero";
import { Menu_Get } from "@/types/menu";
import { getMenu } from "@/util/menu";
import React, { useEffect, useState } from "react";

const Page = () => {
  const title = ["Explore.", "Discover.", "Experience."];
  const [originalMenu, setOriginalMenu] = useState<Menu_Get[]>([]);
  const [menuItems, setMenuItems] = useState<Menu_Get[]>([]);
  const [order, setOrder] = useState<"Ascending" | "Descending">("Ascending");

  const sortPriceAscending = () => {
    const newMenu = menuItems.sort((a, b) => a.price - b.price);
    setMenuItems(newMenu);
    setOrder("Ascending");
  };

  const sortPriceDescending = () => {
    const newMenu = menuItems.sort((a, b) => b.price - a.price);
    setMenuItems(newMenu);
    setOrder("Descending");
  };

  const filterNotAlergen = (ingredients: string[]) => {
    console.log(ingredients);
    const newMenu = originalMenu.filter((item) => {
      const itemIngredients = item.ingredients
        .flatMap((ingredient) =>
          ingredient.split(",").map((allergen) => allergen.trim())
        )
        .filter(Boolean);

      return ingredients.every(
        (ingredient) => !itemIngredients.includes(ingredient)
      );
    });

    setMenuItems(newMenu);
  };

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const menu = await getMenu();
        setOriginalMenu(menu);
        setMenuItems(menu);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMenu();
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

        <section className="w-full flex flex-col justify-center items-center">
          <section className="w-full flex justify-start items-start my-10">
            <Filter
              menu={menuItems}
              order={order}
              filterAllergens={filterNotAlergen}
              sortAscending={sortPriceAscending}
              sortDescending={sortPriceDescending}
            />
          </section>
          {menuItems && <Menuloop menu={menuItems} />}
        </section>
      </section>
    </>
  );
};

export default Page;
