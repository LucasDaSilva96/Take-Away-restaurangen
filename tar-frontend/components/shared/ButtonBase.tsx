interface ButtonBaseProps {
  onClick?: () => void;
  classname?: string;
  text: string;
}
const ButtonBase: React.FC<ButtonBaseProps> = ({
  onClick,
  classname,
  text,
}) => {
  return (
    <button
      onClick={onClick}
      className={`${classname} px-2 py-3 rounded-md text-sm font-motter`}
    >
      {text}
    </button>
  );
};

export default ButtonBase;
