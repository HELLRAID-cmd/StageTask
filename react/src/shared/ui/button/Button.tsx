import type { ReactNode } from "react";
import { Link } from "react-router-dom";

type Props = {
  className?: string;
  type?: "button";
  children?: ReactNode;
  onClick?: () => void;
  variant: "modal" | "errorAPI" | "link" | "add";
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
  if (variant === "add") {
    return (
      <button
        className={`project-item__button ${className} `}
        type={type}
        onClick={onClick}
      >
        {children ? children : "Добавить"}
      </button>
    );
  }

  if (variant === "errorAPI") {
    return (
      <button
        className={`button hero-text__btn btn rounded-2 text-light bg-danger`}
        type={type}
        aria-label="Ошибка сервера"
        disabled={true}
      >
        {children ? children : "Ошибка сервера"}
      </button>
    );
  }

  if (variant === "modal") {
    return (
      <button
        className={`button hero-text__btn btn rounded-2 text-light ${className} `}
        type={type}
        onClick={onClick}
        aria-label="Создать"
      >
        {children ? children : "Создать"}
      </button>
    );
  }

  if (variant === "link") {
    return (
      <Link
        to={`${href}`}
        className={`hero-text__btn btn rounded-2 text-light ${className}`}
        aria-label="Мои проекты"
      >
        {children ? children : "Мои проекты"}
      </Link>
    );
  }

  return (
    <button
      className={`button hero-text__btn btn rounded-2 text-light bg-danger`}
      disabled={true}
    >
      Введите вариант кнопки
    </button>
  );
};

export default Button;
