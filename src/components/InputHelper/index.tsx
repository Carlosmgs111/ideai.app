import styles from "./styles.module.css";
export const InputHelper = ({ left = true }: any) => {
  return (
    <div
      className={`${styles.input_helper} ${left ? styles.left : styles.right}`}
    >
      *
    </div>
  );
};
