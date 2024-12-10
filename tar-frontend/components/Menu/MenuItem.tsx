/* eslint-disable @next/next/no-img-element */
'use client';

import useCart from '@/store/zustandstore';
import ButtonBase from '../shared/ButtonBase';
import { useEffect, useState } from 'react';
import { Menu_Get } from '@/types/menu';

interface menuItemResponse {
  product: Menu_Get;
}

//Component for the displayed menu items

const MenuItem: React.FC<menuItemResponse> = ({ product }) => {
  //Grab state and handlers from zustand
  const { addToCart, cart, removeFromCart, getQuantity, clearItemFromCart } =
    useCart();

  const [isAdded, setIsAdded] = useState<boolean>(false);

  //Check if item is in cart and toggle buttons accordingly
  useEffect(() => {
    const itemExists = cart.find((item) => item.id === product.id);
    if (itemExists) {
      setIsAdded(true);
    } else {
      setIsAdded(false);
    }
  }, [cart, product.id]);

  return (
    <article className='border-2 border-main-primary flex flex-col gap-4 p-3 md:p-6 rounded-md'>
      <section className='w-full aspect-video rounded-md overflow-hidden border-2  border-main-primary'>
        <img
          src={product.image}
          alt={product.title}
          className='object-cover w-full '
        />
      </section>
      <section className='w-full flex flex-col'>
        <h2 className='text-2xl font-motter text-main-primary font-semibold'>
          {product.title} - {product.price}€
        </h2>
        <p className='font-alumni text-xl text-main-primary'>
          {product.description}
        </p>
      </section>
      <section className='w-full flex justify-between items-center'>
        {isAdded ? (
          <ButtonBase
            text='Remove from order'
            onClick={() => clearItemFromCart(product.id)}
            classname='text-main-light bg-main-secondary'
          />
        ) : (
          <ButtonBase
            text='Add to order'
            onClick={() => addToCart(product)}
            classname='text-main-light bg-main-primary'
          />
        )}
        <section className='flex justify-center items-center gap-2 font-motter text-2xl'>
          <button
            onClick={() => removeFromCart(product)}
            className='border-none bg-transparent text-main-primary'
          >
            -
          </button>
          <button className='border-none bg-transparent text-main-primary'>
            {getQuantity(product.id)}
          </button>
          <button
            onClick={() => addToCart(product)}
            className='border-none bg-transparent text-main-primary'
          >
            +
          </button>
        </section>
      </section>
    </article>
  );
};

export default MenuItem;
