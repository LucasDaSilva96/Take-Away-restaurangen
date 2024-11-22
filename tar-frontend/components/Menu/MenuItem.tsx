"use client";

import useCart from "@/store/zustandstore";
import ButtonBase from "../shared/ButtonBase";
import { useEffect, useState } from "react";

interface menuItemResponse {
  product: {
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
  };
}

const MenuItem: React.FC<menuItemResponse> = ({ product }) => {
  const { addToCart, cart, removeFromCart, getQuantity } = useCart();

  const [isAdded, setIsAdded] = useState<boolean>(false);

  useEffect(() => {
    const itemExists = cart.find((item) => item.id === product.id);
    if (itemExists) {
      setIsAdded(true);
    } else {
      setIsAdded(false);
    }
  }, [cart]);

  return (
    <article className="border-2 border-main-primary flex flex-col gap-4 p-3 md:p-6 rounded-md">
      <section className="w-full aspect-video rounded-md overflow-hidden border-2  border-main-primary">
        <img
          src={product.image}
          alt={product.title}
          className="object-cover w-full "
        />
      </section>
      <section className="w-full flex flex-col">
        <h2 className="text-2xl font-motter text-main-primary font-semibold">
          {product.title} - {product.price}€
        </h2>
        <p className="font-alumni text-xl text-main-primary">
          {product.description}
        </p>
      </section>
      <section className="w-full flex justify-between items-center">
        {isAdded ? (
          <ButtonBase
            text="Remove from order"
            onClick={() => removeFromCart(product)}
            classname="text-main-light bg-main-secondary"
          />
        ) : (
          <ButtonBase
            text="Add to order"
            onClick={() => addToCart(product)}
            classname="text-main-light bg-main-primary"
          />
        )}
        <section className="flex justify-center items-center gap-2 font-motter text-2xl">
          <button
            onClick={() => removeFromCart(product)}
            className="border-none bg-transparent text-main-primary"
          >
            -
          </button>
          <button className="border-none bg-transparent text-main-primary">
            {getQuantity(product.id)}
          </button>
          <button
            onClick={() => addToCart(product)}
            className="border-none bg-transparent text-main-primary"
          >
            +
          </button>
        </section>
      </section>
    </article>
  );
};

export default MenuItem;
