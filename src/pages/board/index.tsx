import styles from "./styles.module.css";
import { MarkmapVisualizer } from "../../components/MarkmapVisualizer";
import { useStateValue } from "../../context";
import { mapToList } from "../../utils";
import { ComponentReferencer } from "../../components/ComponentReferencer";
import { useNavScroll } from "../../hooks/useNavScroll";
import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

const Anchor = ({ children }: any) => {
  const ref = useRef(null);
  return (
    <div id={children} ref={ref} className={`${styles.anchor}`}>
      <span>{children}</span>
    </div>
  );
};

const Dashboard = ({ children }: any) => {
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
  const location = useLocation();
  const { container, elements, navIndexes, navPrev, navNext, navTo }: any =
    useNavScroll(
      {
        horizontal: true,
      },
      [markmaps]
    );

  useEffect(() => {
    const currentUUID = location.search.split("?uuid=")[1];
    const index = mapToList(markmaps).findIndex(
      ({ uuid }: any) => uuid === currentUUID
    );
    if (index > -1) navTo(index);
  }, [location, markmaps]);

  return (
    <div className={styles.page}>
      <button onClick={navPrev}>
        <i className={`fa-solid fa-chevron-left`}></i>
      </button>
      <div ref={container} className={styles.content}>
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
      <button onClick={navNext}>
        <i className={`fa-solid fa-chevron-right`}></i>
      </button>
      <Dashboard>
        <ComponentReferencer>
          {mapToList(markmaps).map((markmap: any, idx: any) => {
            return (
              <Anchor key={idx} $refs={navIndexes} idx={String(idx)}>
                {markmap.title}
              </Anchor>
            );
          })}
        </ComponentReferencer>
      </Dashboard>
    </div>
  );
};
