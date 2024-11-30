import Link from 'next/link';
import React from 'react';

interface MenuCardsProps {
  index: number;
  title: string;
  description: string;
  icon: string;
  url: string;
}

export const MenuCards: React.FC<MenuCardsProps> = ({
  index,
  title,
  description,
  icon,
  url,
}) => {
  return (
    <Link href={url}>
      <div
        key={index}
        className='bg-main-primary flex p-5 items-center justify-center rounded-xl gap-10 max-w-96 min-w-64'
      >
        <img src={icon} alt={title} />
        <div>
          <h2 className='text-xl font-bold font-motter '>{title}</h2>
          <p className='text-blue-500'>{description}</p>
        </div>
      </div>
    </Link>
  );
};

const Page = () => {
  const menuOptions = [
    {
      title: 'Menu',
      description: 'Unlimited protection',
      icon: '/icons/pizza.png',
      url: '/menu',
    },
    {
      title: 'Orders',
      description: 'Buy. Think. Grow',
      icon: '/icons/cutlery.png',
      url: '',
    },
    {
      title: 'Inventory',
      description: 'We are your allies',
      icon: '/icons/cloche.png',
      url: '',
    },
  ];
  return (
    <>
      <div className='flex gap-10 overflow-x-scroll'>
        {menuOptions.map((card, index) => (
          <MenuCards
            key={index}
            index={index}
            title={card.title}
            description={card.description}
            icon={card.icon}
            url={card.url}
          />
        ))}
      </div>
    </>
  );
};
export default Page;
