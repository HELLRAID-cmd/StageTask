import type { ButtonHTMLAttributes } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant: "button" | "add";
}

const Button = ({ className, type, children, onClick, variant }: Props) => {
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

  if (variant === "button") {
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
