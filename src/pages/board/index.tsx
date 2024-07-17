import styles from "./styles.module.css";
import { MarkmapVisualizer } from "../../components/MarkmapVisualizer";
import { useStateValue } from "../../context";
import { mapToList } from "../../utils";
import { ComponentReferencer } from "../../components/ComponentReferencer";
import { useSmoothScroll } from "../../hooks/useSmoothScroll";
import { useRef } from "react";

const Anchor = ({ children }: any) => {
  const ref = useRef(null);
  return (
    <div id={children} ref={ref} className={`${styles.anchor}`}>
      <span>{children}</span>
    </div>
  );
};

const Dashboard = ({ children }: any) => {
  if (!children.props.children[0]) return;
  return (
    <div className={styles.dashboard}>
      <div className={styles.navboard}>
        <button
          className="fa-solid fa-caret-left"
          onClick={() => console.log("left")}
        ></button>
        <div className={styles.indexes}>{children}</div>
        <button
          className="fa-solid fa-caret-right"
          onClick={() => console.log("right")}
        ></button>
      </div>
    </div>
  );
};

export const Board = ({}: any) => {
  const [{ markmaps }]: any = useStateValue();
  const { parent, elements, anchors }: any = useSmoothScroll(
    {
      horizontal: true,
    },
    [markmaps]
  );

  return (
    <div className={styles.page}>
      <div ref={parent} className={styles.content}>
        <ComponentReferencer>
          {mapToList(markmaps).map((markmap: any, idx: any) => (
            <MarkmapVisualizer
              key={idx}
              $refs={elements}
              idx={String(idx)}
              {...markmap}
            ></MarkmapVisualizer>
          ))}
        </ComponentReferencer>
      </div>
      <Dashboard>
        <ComponentReferencer>
          {mapToList(markmaps).map((markmap: any, idx: any) => (
            <Anchor key={idx} $refs={anchors} idx={String(idx)}>
              {markmap.uuid}
            </Anchor>
          ))}
        </ComponentReferencer>
      </Dashboard>
    </div>
  );
};
