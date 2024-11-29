import React from "react";

interface MenuCardsProps {
  index: number;
  title: string;
  description: string;
  icon: any;
}

export const MenuCards: React.FC<MenuCardsProps> = ({
  index,
  title,
  description,
  icon,
}) => {
  return (
    <div
      key={index}
      className="bg-main-primary flex p-5 items-center justify-center rounded-xl gap-10 max-w-96 min-w-64"
    >
      <img src={icon} alt={title} />
      <div>
        <h2 className="text-xl font-bold font-motter ">{title}</h2>
        <p className="text-blue-500">{description}</p>
      </div>
    </div>
  );
};

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
