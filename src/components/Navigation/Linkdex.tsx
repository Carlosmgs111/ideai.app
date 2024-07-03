import { Link, useLocation } from "react-router-dom";
import styles from "./styles.module.css";

export const Linkdex = ({
  label,
  linkRef = { current: null },
  children,
  to,
  className = "",
  onClick = () => {},
}: any) => {
  const { pathname } = useLocation();
  const isCurrent = pathname.split("/")[1] === to;
  const href = to ? `/${to}` : `/${label}`;
  const child = children || <span>{label}</span>;
  return (
    <Link
      className={`${styles.link} ${className} ${
        isCurrent ? styles.selected : null
      }`}
      ref={linkRef}
      id={`link_${label}`}
      to={href}
      key={label}
      onClick={onClick}
    >
      {child}
    </Link>
  );
};
