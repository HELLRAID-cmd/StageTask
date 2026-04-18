import type { ReactNode } from "react";
import { Link } from "react-router-dom";

type Props = {
  className?: string;
  type?: "button";
  children?: ReactNode;
  onClick?: () => void;
  variant: "modal" | "button" | "link";
  href?: string;
};

const Button = ({
  className,
  type,
  children,
  onClick,
  variant,
  href,
}: Props) => {
  if (variant === "modal") {
    return (
      <button className={`button ${className}`} type={type} onClick={onClick}>
        {children ? children : "Создать"}
      </button>
    );
  }

  if (variant === "link") {
    return (
      <Link
        to={`${href}`}
        className={`hero-text__btn btn rounded-2 text-light ${className}`}
      >
        {children ? children : "Мои проекты"}
      </Link>
    );
  }
};

export default Button;
