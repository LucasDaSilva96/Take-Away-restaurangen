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
