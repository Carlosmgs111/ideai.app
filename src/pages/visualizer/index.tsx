import styles from "./styles.module.css";
import { MarkmapVisualizer } from "../../components/MarkmapVisualizer";

export const Visualizer = ({}: any) => {
  return (
    <div className={styles.page}>
      <MarkmapVisualizer></MarkmapVisualizer>
    </div>
  );
};
