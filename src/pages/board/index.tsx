import styles from "./styles.module.css";
import { MarkmapVisualizer } from "../../components/MarkmapVisualizer";
import { useStateValue } from "../../context";

export const Board = ({}: any) => {
  const [{ markmap }]: any = useStateValue();
  return (
    <div className={styles.page}>
      <MarkmapVisualizer markmap={markmap}></MarkmapVisualizer>
    </div>
  );
};
