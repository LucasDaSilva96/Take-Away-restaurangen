interface ButtonBaseProps {
  onClick?: () => void;
  classname?: string;
  text: string;
  type?: "button" | "submit" | "reset";
}
const ButtonBase: React.FC<ButtonBaseProps> = ({
  onClick,
  classname,
  text,
  type = "button",
}) => {
  return (
    <button
      type={type} //
      onClick={onClick}
      className={`${classname} px-2 py-3 rounded-md text-sm font-motter`}
    >
      {text}
    </button>
  );
};

export default ButtonBase;
