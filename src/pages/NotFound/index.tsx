import styles from "./styles.module.css";

export function NotFound() {
  return (
    <div className={styles.page}>
      <div className={styles.content}>
        <h2>Not Found!</h2>
        <h1>404</h1>
      </div>
    </div>
  );
}
