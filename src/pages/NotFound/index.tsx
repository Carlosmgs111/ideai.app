import styles from "./styles.module.css";
import { useStateValue } from "../../context";

export function NotFound() {
  const [{ theme }]:any = useStateValue();
  return (
    <div className={`${styles.page} ${styles[theme]}`}>
      <div className={styles.content}>
        <h2>Not Found!</h2>
        <h1>404</h1>
      </div>
    </div>
  );
}
