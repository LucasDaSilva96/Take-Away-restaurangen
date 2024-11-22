import { menuItemResponse } from "@/app/menu/page";
import MenuItem from "./MenuItem";

interface MenuloopProps {
  menu: menuItemResponse[];
}

const Menuloop: React.FC<MenuloopProps> = ({ menu }) => {
  return (
    <section className="w-full grid grid-cols-1 gap-4 py-10 md:grid-cols-2 lg:grid-cols-4">
      {menu.map((item, index) => (
        <MenuItem key={item.id + index} product={item} />
      ))}
    </section>
  );
};

export default Menuloop;
