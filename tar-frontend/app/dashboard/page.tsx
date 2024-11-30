import React from "react";
import { MenuCards } from "@/components/dashboard-component/menuCards";

const Page = () => {
  const menuOptions = [
    {
      title: "Meny",
      description: "Unlimited protection",
      icon: "/icons/pizza.png",
    },
    {
      title: "Orders",
      description: "Buy. Think. Grow",
      icon: "/icons/cutlery.png",
    },
    {
      title: "Inventory",
      description: "We are your allies",
      icon: "/icons/cloche.png",
    },
  ];
  return (
    <>
      <div className="flex gap-10 overflow-x-scroll">
        {menuOptions.map((card, index) => (
          <MenuCards
            index={index}
            title={card.title}
            description={card.description}
            icon={card.icon}
          />
        ))}
      </div>
    </>
  );
};
export default Page;
