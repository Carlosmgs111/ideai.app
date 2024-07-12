import styles from "./styles.module.css";
import { MarkmapVisualizer } from "../../components/MarkmapVisualizer";
import { useStateValue } from "../../context";
import { mapToList } from "../../utils";
import { SidePanel } from "../../components/SidePanel";
import { useTrackSidebar } from "../../hooks/useTrackSidebar";

export const Board = ({}: any) => {
  const { TrackSidebar, ContentWrapper }: any = useTrackSidebar();
  const [{ markmaps }]: any = useStateValue();
  return (
    <div className={styles.page}>
      <SidePanel
        {...{
          // width: "240px",
          float: true,
          multi: true,
          settings: true,
          sidebars: [<TrackSidebar />],
        }}
      >
        <div className={styles.content}>
          <ContentWrapper>
            {mapToList(markmaps).map((markmap: any, key: any) => (
              <MarkmapVisualizer
                key={key}
                id={markmap.uuid}
                {...markmap}
              ></MarkmapVisualizer>
            ))}
          </ContentWrapper>
        </div>
      </SidePanel>
    </div>
  );
};
