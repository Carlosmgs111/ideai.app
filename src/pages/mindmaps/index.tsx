import styles from "./styles.module.css";
import { MarkmapVisualizer } from "../../components/MarkmapVisualizer";
import { useStateValue } from "../../context";
import { mapToList } from "../../utils";
import { SidePanel } from "../../components/SidePanel";
import { useTrackSidebar } from "../../hooks/useTrackSidebar";
import { Preview } from "../../containers/Preview";

export const Mindmaps = ({}: any) => {
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
          {mapToList(markmaps).length && (
            <ContentWrapper>
              {mapToList(markmaps).map((markmap: any, key: any) => (
                <Preview title={markmap.title} id={markmap.uuid} key={key}>
                  <MarkmapVisualizer
                    {...{ ...markmap, preview: true }}
                  ></MarkmapVisualizer>
                </Preview>
              ))}
            </ContentWrapper>
          )}
        </div>
      </SidePanel>
    </div>
  );
};
