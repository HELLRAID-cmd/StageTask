import type { ButtonHTMLAttributes } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {}

const ButtonProject = ({
  className,
  type,
  children,
  onClick,
  ...props
}: Props) => {
  return (
    <button
      className={`project-item__button ${className}`}
      onClick={onClick}
      type={type}
      aria-label="Создать проект"
      {...props}
    >
      {children ? children : ""}
    </button>
  );
};

export default ButtonProject;
