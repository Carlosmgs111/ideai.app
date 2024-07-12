import styles from "./styles.module.css";
import { MarkmapVisualizer } from "../../components/MarkmapVisualizer";
import { useStateValue } from "../../context";
import { mapToList } from "../../utils";

export const Board = ({}: any) => {
  const [{ markmaps }]: any = useStateValue();
  return (
    <div className={styles.page}>
      {mapToList(markmaps).map((markmap: any, key: any) => (
        <MarkmapVisualizer key={key} {...markmap}></MarkmapVisualizer>
      ))}
    </div>
  );
};
