import styles from "./styles.module.css";
import { MarkmapVisualizer } from "../../containers/MarkmapVisualizer";
import { useStateValue } from "../../context";
import { listToMap } from "../../utils";
import { SidePanel } from "../../components/SidePanel";
import { useTrackSidebar } from "../../hooks/useTrackSidebar";
import { MarkmapPreview } from "../../containers/MarkmapPreview";
import { Memo } from "../../hocs/Memo";
import { useEffect, useState } from "react";
import { URL_API } from "../../services";

export const Mindmaps = ({}: any) => {
  const { TrackSidebar, ContentWrapper }: any = useTrackSidebar();
  let [{ markmaps, orderedMarkmaps, theme }, dispatch]: any = useStateValue();
  const [currentPage, setCurrentPage] = useState(1);
  const [currentMarkmaps, setCurrentMarkmaps] = useState([]);
  const qty = 10;
  useEffect(() => {
    if (orderedMarkmaps[(currentPage - 1) * qty]) {
      const currentMarkmaps: any = [];
      for (let i = qty * currentPage - qty; i < qty * currentPage; i++) {
        if (orderedMarkmaps[i]) {
          currentMarkmaps.push(markmaps[orderedMarkmaps[i]]);
        }
      }
      setCurrentMarkmaps(currentMarkmaps);
      return;
    }
    fetch(
      `${URL_API}/markmap/getmanymarkmaps?size=${qty}&page=${currentPage - 1}`,
      {
        method: "GET",
      }
    )
      .then((response: any) => response.json())
      .then((data) => {
        setCurrentMarkmaps(data);
        if ((currentPage - 1) * qty > orderedMarkmaps.length) {
          const prevLength = orderedMarkmaps.length;
          orderedMarkmaps[(currentPage - 1) * qty] = data[0];
          orderedMarkmaps.fill(null, prevLength, orderedMarkmaps.length - 1);
          orderedMarkmaps.splice(
            (currentPage - 1) * qty,
            1,
            ...data.map(({ uuid }: any) => uuid)
          );
        }
        orderedMarkmaps.splice(
          (currentPage - 1) * qty,
          data.length,
          ...data.map(({ uuid }: any) => uuid)
        );
        dispatch({
          markmaps: { ...markmaps, ...listToMap(data, "uuid") },
          orderedMarkmaps,
        });
      });
  }, [currentPage]);
  useEffect(() => {
    if (!orderedMarkmaps[(currentPage - 1) * qty]) return;
    const currentMarkmaps: any = [];
    for (let i = qty * currentPage - qty; i < qty * currentPage; i++) {
      if (orderedMarkmaps[i]) {
        currentMarkmaps.push(markmaps[orderedMarkmaps[i]]);
      }
    }
    setCurrentMarkmaps(currentMarkmaps);
  }, [markmaps]);
  return (
    <div className={styles.page}>
      <main className={styles.content}>
        <SidePanel
          {...{
            // width: "240px",
            multi: true,
            sidebars: [<TrackSidebar />],
          }}
        >
          <Memo deps={[currentMarkmaps]}>
            <div className={styles.elements}>
              <ContentWrapper>
                {currentMarkmaps.map((markmap: any, key: any) => (
                  <MarkmapPreview
                    title={markmap.title}
                    id={markmap.uuid}
                    key={key}
                  >
                    <MarkmapVisualizer
                      {...{ ...markmap, preview: true }}
                    ></MarkmapVisualizer>
                  </MarkmapPreview>
                ))}
              </ContentWrapper>
            </div>
          </Memo>
        </SidePanel>
        <div className={`${styles.pagination} ${styles[theme]}`}>
          <ul>
            <li>
              <button onClick={() => setCurrentPage(1)}>1</button>
            </li>
            <li>
              <button onClick={() => setCurrentPage(2)}>2</button>
            </li>
            <li>
              <button onClick={() => setCurrentPage(3)}>3</button>
            </li>
            <li>
              <button onClick={() => setCurrentPage(4)}>4</button>
            </li>
            <li>
              <button onClick={() => setCurrentPage(5)}>5</button>
            </li>
            <li>
              <button onClick={() => setCurrentPage(6)}>6</button>
            </li>
          </ul>
        </div>
      </main>
    </div>
  );
};
