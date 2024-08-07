import styles from "./styles.module.css";
import { MarkmapVisualizer } from "../../containers/MarkmapVisualizer";
import { useStateValue } from "../../context";
import { mapToList } from "../../utils";
import { SidePanel } from "../../components/SidePanel";
import { useTrackSidebar } from "../../hooks/useTrackSidebar";
import { MarkmapPreview } from "../../containers/MarkmapPreview";

export const Mindmaps = ({}: any) => {
  const { TrackSidebar, ContentWrapper }: any = useTrackSidebar();
  const [{ markmaps }]: any = useStateValue();
  const markmapsArray = mapToList(markmaps);
  return (
    <div className={styles.page}>
      <SidePanel
        {...{
          // width: "240px",
          multi: true,
          sidebars: [<TrackSidebar />],
        }}
      >
        <div className={styles.content}>
          {markmapsArray.length && (
            <ContentWrapper>
              {markmapsArray.map((markmap: any, key: any) => (
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
      </SidePanel>
    </div>
  );
};
