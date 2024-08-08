import styles from "./styles.module.css";
import { MarkmapPreviewDashboard } from "../MarkmapPreviewDashboard";
import { useStateValue } from "../../context";
import { useToggle } from "../../hooks/useToggle";

const DetailView = ({ title, uuid, description }: any) => {
  return (
    <div className={styles.detail_view}>
      <h3>{title}</h3>
      <h5>{uuid}</h5>
      <article>{description}</article>
    </div>
  );
};

export const MarkmapPreview = ({ children }: any) => {
  const { uuid, title }: any = children.props;
  const [{}, dispatch]: any = useStateValue();
  const [detailView, toggleDetailView] = useToggle(false, true);
  const settingsButtonOnClick = () => {
    dispatch({
      type: "setCurrentModal",
      payload: <MarkmapPreviewDashboard {...{ uuid, title }} />,
    });
  };
  return (
    <div className={styles.container}>
      <a href={`/board?uuid=${uuid}`}>
        {detailView ? <DetailView {...{ uuid, title }} /> : children}
      </a>
      <div className={styles.panel}>
        <div className={styles.dashboard}>
          <button onClick={settingsButtonOnClick}>
            <i className={`fa-solid fa-screwdriver-wrench`}></i> Configuraciónes
          </button>
          <button onClick={toggleDetailView}>
            <i
              className={`${
                detailView
                  ? "fa-solid fa-rotate-left"
                  : "fa-solid fa-circle-info"
              }`}
            ></i>{" "}
            {detailView ? "Volver" : "Ver Detalles"}
          </button>
        </div>
      </div>
    </div>
  );
};
