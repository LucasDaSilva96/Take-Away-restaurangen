import { Menu_Get } from '@/types/menu';
import MenuItem from './MenuItem';

interface MenuloopProps {
  menu: Menu_Get[];
}

const Menuloop: React.FC<MenuloopProps> = ({ menu }) => {
  //Loops all items from the menu and places them in a grid
  return (
    <section className='w-full grid grid-cols-1 gap-4 py-10 md:grid-cols-2 lg:grid-cols-4'>
      {menu.map((item, index) => (
        <MenuItem key={item.id + index} product={item} />
      ))}
    </section>
  );
};

export default Menuloop;
