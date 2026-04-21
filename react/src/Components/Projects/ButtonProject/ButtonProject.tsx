import type { ReactNode } from "react";

type Props = {
  className?: string;
  type?: "button";
  children?: ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

const ButtonProject = ({ className, type, children, onClick }: Props) => {
  return (
    <button
      className={`project-item__button ${className}`}
      onClick={onClick}
      type={type}
      aria-label="Создать проект"
    >
      {children ? children : ""}
    </button>
  );
};

export default ButtonProject;
