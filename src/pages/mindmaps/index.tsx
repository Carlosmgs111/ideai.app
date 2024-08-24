import styles from "./styles.module.css";
import { MarkmapVisualizer } from "../../containers/MarkmapVisualizer";
import { useStateValue } from "../../context";
import { listToMap, mapToList } from "../../utils";
import { SidePanel } from "../../components/SidePanel";
import { useTrackSidebar } from "../../hooks/useTrackSidebar";
import { MarkmapPreview } from "../../containers/MarkmapPreview";
import { Memo } from "../../hocs/Memo";
import { useEffect, useState } from "react";
import { URL_API } from "../../services";

export const Mindmaps = ({}: any) => {
  const { TrackSidebar, ContentWrapper }: any = useTrackSidebar();
  const [{ markmaps, theme }, dispatch]: any = useStateValue();
  const markmapsArray = [...mapToList(markmaps)];
  const [currentPage, setCurrentPage] = useState(1);
  const qty = 10;

  useEffect(() => {
    if (currentPage - 1 * qty === mapToList(markmaps).length) return;
    fetch(
      `${URL_API}/markmap/getmanymarkmaps?size=${qty}&page=${currentPage - 1}`,
      {
        method: "GET",
      }
    )
      .then((response: any) => response.json())
      .then((data) => {
        const markmapsList = mapToList(markmaps);
        markmapsList.splice((currentPage - 1) * qty, 0, mapToList(data));
        dispatch({ markmaps: { ...listToMap(markmapsList.flat(), "uuid") } });
      });
  }, [currentPage]);

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
          <Memo deps={[markmaps]}>
            <div className={styles.elements}>
              {markmapsArray.length && (
                <ContentWrapper>
                  {markmapsArray
                    .slice(qty * currentPage - qty, qty * currentPage)
                    .map((markmap: any, key: any) => (
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
              )}
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
          </ul>
        </div>
      </main>
    </div>
  );
};
