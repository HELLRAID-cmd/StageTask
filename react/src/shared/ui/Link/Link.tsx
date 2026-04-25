import { Link, type LinkProps } from "react-router-dom";
import "./link.scss";

interface Props extends LinkProps {
  size?: "primary" | "mini";
}

function CustomLink({
  className,
  children,
  to,
  size = "primary",
  ...props
}: Props) {
  return (
    <Link
      to={`${to ?? "/"}`}
      {...props}
      className={`custom-link rounded-2 text-light ${className} ${size ?? ""}`}
      aria-label="Мои проекты"
    >
      {children ? children : "Перейти"}
    </Link>
  );
}

export default CustomLink;
