interface SettingCardsProps {
  placeHolder?: string;
  title: string;
  index: number;
  onClick: () => void;
}

export const SettingCards: React.FC<SettingCardsProps> = ({
  placeHolder,
  title,
  index,
  onClick,
}) => {
  return (
    <button
      type="submit"
      className="min-w-48 max-w-96 w-full h-56 rounded-md bg-main-moss flex justify-center items-center card-full-width"
      key={index}
      onClick={onClick}
    >
      <div>
        {placeHolder && (
          <h1 className="text-2xl font-motter text-main-secondary">
            {placeHolder}
          </h1>
        )}
        <h2 className="font-motter text-xl text-main-primary ">{title}</h2>
      </div>
    </button>
  );
};
