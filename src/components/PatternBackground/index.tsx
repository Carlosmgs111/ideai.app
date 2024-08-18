import styles from "./styles.module.css";
import colors from "../../db/colors.json";
import { shuffleArray } from "../../utils";
import { useStateValue } from "../../context";

export const PatternBackground = ({ children, tiny = false }: any) => {
  const [{ theme }]: any = useStateValue();
  const [primary, secondary, terciary] = shuffleArray(
    colors["neon.v2"].map(({ hex }: any) => hex)
  );
  return (
    <div className={`${styles.container} ${styles[theme]} `}>
      <div
        className={styles.background}
        style={{
          background: `radial-gradient(
          circle at 0% 0%,
          ${primary},
          ${secondary},
          ${terciary},
          ${secondary},
          ${primary},
          ${secondary},
          ${terciary},
          ${secondary},
          ${primary}
        )`,
        }}
      ></div>
      <div className={`${styles.pattern} ${tiny && styles.tiny}`}></div>
      {children}
    </div>
  );
};
