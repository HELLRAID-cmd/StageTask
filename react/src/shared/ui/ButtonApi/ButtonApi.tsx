import type { ReactNode } from "react";

type Props = {
  className?: string;
  children?: ReactNode;
};

const ButtonApi = ({ className, children }: Props) => {
  return (
    <button
      className={`button ${className} hero-text__btn btn rounded-2 text-light bg-danger`}
      aria-label="Ошибка сервера"
      disabled={true}
    >
      {children ? children : "Ошибка сервера"}
    </button>
  );
};

export default ButtonApi;
