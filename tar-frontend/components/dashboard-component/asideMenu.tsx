interface asideMenuProps {
  title: string;
  imgPath: string;
  index: number;
}

export const AsideMenu: React.FC<asideMenuProps> = ({
  title,
  imgPath,
  index,
}) => {
  return (
    <div className="w-full flex justify-center items-center ">
      <div
        key={index}
        className="flex  w-full justify-center items-center gap-5"
      >
        <div className="w-10 flex justify-center items-center">
          <img src={imgPath} />
        </div>
        <div className="w-20 text-main-primary">
          <h2 className="font-alumni text-2xl">{title}</h2>
        </div>
      </div>
    </div>
  );
};
