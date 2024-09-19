import styles from "./styles.module.css";
import { MarkmapVisualizer } from "../../containers/MarkmapVisualizer";
import { useStateValue } from "../../context";
import { mapToList } from "../../utils";
import { useNavScroll } from "../../hooks/useNavScroll";
import { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Memo } from "../../hocs/Memo";
import { PatternBackground } from "../../components/PatternBackground";
import { lazyLoad, LazyComponent } from "../../components/LazyComponent";
const Refs = lazyLoad(() => import("../../hocs/Refs"), "Refs");

const Anchor = ({ children }: any) => {
  const ref = useRef(null);
  return (
    <div id={children} ref={ref} className={`${styles.anchor}`}>
      <span>{children}</span>
    </div>
  );
};

const QuicknavDashboard = ({ children, hide = false }: any) => {
  return (
    <div className={`${styles.dashboard} ${!hide && styles.hide}`}>
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

export const Board = ({ quicknav = false }: any) => {
  const [{ markmaps }]: any = useStateValue();
  // console.log({ markmaps });
  const location = useLocation();
  const navigate = useNavigate();
  const {
    container,
    elements,
    navIndexes,
    navPrev,
    navNext,
    navTo,
    current,
  }: any = useNavScroll({ horizontal: true }, [markmaps]);

  useEffect(() => {
    const currentUUID = location.search.split("?uuid=")[1];
    const index = mapToList(markmaps).findIndex(
      ({ uuid }: any) => uuid === currentUUID
    );
    if (index > -1) navTo(index);
  }, []);

  useEffect(() => {
    const currentUUID = mapToList(markmaps)[current]?.uuid;
    if (!currentUUID) return;
    navigate(`?uuid=${mapToList(markmaps)[current].uuid}`);
  }, [current]);

  return (
    <div className={styles.page}>
      <button onClick={navPrev}>
        <i className={`fa-solid fa-chevron-left`}></i>
      </button>
      <Memo deps={[markmaps]}>
        <div ref={container} className={styles.content}>
          <LazyComponent Component={Refs} $refs={elements}>
            {mapToList(markmaps).map((markmap: any, idx: any) => (
              <PatternBackground key={idx}>
                <MarkmapVisualizer
                  idx={String(idx)}
                  {...markmap}
                ></MarkmapVisualizer>
              </PatternBackground>
            ))}
          </LazyComponent>
        </div>
      </Memo>
      <button onClick={navNext}>
        <i className={`fa-solid fa-chevron-right`}></i>
      </button>
      <QuicknavDashboard hide={quicknav}>
        <LazyComponent Component={Refs} $refs={navIndexes}>
          {mapToList(markmaps).map((markmap: any, idx: any) => {
            return (
              <Anchor key={idx} idx={String(idx)}>
                {markmap.title}
              </Anchor>
            );
          })}
        </LazyComponent>
      </QuicknavDashboard>
    </div>
  );
};
