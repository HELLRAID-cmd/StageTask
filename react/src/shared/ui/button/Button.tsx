import type { ButtonHTMLAttributes } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant: "button" | "add";
}

const Button = ({ className, type, children, onClick, variant, ...props }: Props) => {
  if (variant === "add") {
    return (
      <button
        className={`project-item__button ${className} `}
        type={type}
        onClick={onClick}
        {...props}
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
        {...props}
      >
        {children ? children : "Кнопка"}
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
