import styles from "./styles.module.css";
import { MarkmapVisualizer } from "../../components/MarkmapVisualizer";

export const Home = ({}: any) => {
  return (
    <div className={styles.page}>
      <MarkmapVisualizer />
    </div>
  );
};
