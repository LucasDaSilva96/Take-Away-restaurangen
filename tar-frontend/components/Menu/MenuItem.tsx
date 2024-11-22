import ButtonBase from "../shared/ButtonBase";

export interface MenuItemProps {
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  contains: string[];
}

const MenuItem: React.FC<MenuItemProps> = ({
  name,
  description,
  image,
  contains,
  price,
  category,
}) => {
  return (
    <article className="border-2 border-main-primary flex flex-col gap-4 p-3 md:p-6 rounded-md">
      <section className="w-full aspect-video relative rounded-md overflow-hidden border-2 border-main-primary">
        <img src={image} alt={name} className="object-cover w-full " />
      </section>
      <section className="w-full flex flex-col">
        <h2 className="text-2xl font-motter text-main-primary font-semibold">
          {name} - {price}€
        </h2>
        <p className="font-alumni text-xl text-main-primary">{description}</p>
      </section>
      <section className="w-full flex justify-between items-center">
        <ButtonBase
          text="Add to order"
          classname="text-main-light bg-main-primary"
        />
        <section className="flex justify-center items-center gap-2 font-motter text-2xl">
          <button className="border-none bg-transparent text-main-primary">
            -
          </button>
          <button className="border-none bg-transparent text-main-primary">
            0
          </button>
          <button className="border-none bg-transparent text-main-primary">
            +
          </button>
        </section>
      </section>
    </article>
  );
};

export default MenuItem;
