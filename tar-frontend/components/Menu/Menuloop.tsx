import MenuItem, { MenuItemProps } from "./MenuItem";

interface MenuloopProps {
  menu: MenuItemProps[];
}

const Menuloop: React.FC<MenuloopProps> = ({ menu }) => {
  return (
    <section className="w-full grid grid-cols-1 gap-4 py-10 md:grid-cols-2 lg:grid-cols-4">
      {menu.map((item, index) => (
        <MenuItem
          key={index}
          name={item.name}
          description={item.description}
          price={item.price}
          image={item.image}
          category={item.category}
          contains={item.contains}
        />
      ))}
    </section>
  );
};

export default Menuloop;
