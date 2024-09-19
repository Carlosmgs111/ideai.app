import styles from "./styles.module.css";

/**
 * Credits to tobiasahlin
 * https://github.com/tobiasahlin
 * https://tobiasahlin.com/spinkit
 */

export const CubeGridLoader = ({ style = {}, theme = "light" }: any) => {
  return (
    <div style={style} className={`${styles.container} ${styles[theme]}`}>
      <div className={styles["sk-cube-grid"]}>
        <div className={`${styles["sk-cube"]} ${styles["sk-cube1"]}`}></div>
        <div className={`${styles["sk-cube"]} ${styles["sk-cube2"]}`}></div>
        <div className={`${styles["sk-cube"]} ${styles["sk-cube3"]}`}></div>
        <div className={`${styles["sk-cube"]} ${styles["sk-cube4"]}`}></div>
        <div className={`${styles["sk-cube"]} ${styles["sk-cube5"]}`}></div>
        <div className={`${styles["sk-cube"]} ${styles["sk-cube6"]}`}></div>
        <div className={`${styles["sk-cube"]} ${styles["sk-cube7"]}`}></div>
        <div className={`${styles["sk-cube"]} ${styles["sk-cube8"]}`}></div>
        <div className={`${styles["sk-cube"]} ${styles["sk-cube9"]}`}></div>
      </div>
    </div>
  );
};
