import styles from "./styles.module.css";
import { MarkmapPreviewDashboard } from "../MarkmapPreviewDashboard";
import { Memo } from "../../hocs/Memo";
import { useStateValue } from "../../context";
import { useToggle } from "../../hooks/useToggle";
import { Link } from "react-router-dom";
import colors from "../../db/colors.json";
import { shuffleArray } from "../../utils";
const DetailView = ({ title, description }: any) => {
  return (
    <div className={styles.detail_view}>
      <h3>{title}</h3>
      <article>{description}</article>
    </div>
  );
};

export const MarkmapPreview = ({ children }: any) => {
  const [primary, secondary, terciary] = shuffleArray(
    colors["neon.v2"].map(({ hex }: any) => hex)
  );
  const markmap: any = children.props;
  const [{ theme }, dispatch]: any = useStateValue();
  const [detailView, toggleDetailView] = useToggle(false, true);
  const settingsButtonOnClick = () => {
    dispatch({
      currentModal: <MarkmapPreviewDashboard {...markmap} />,
    });
  };
  return (
    <Memo deps={[children.props, detailView, theme]}>
      <div className={`${styles.container} ${styles[theme]}`}>
        <div
          className={styles.background}
          style={{
            background: `radial-gradient(
            circle at 0% 0%,
            ${primary},
            ${secondary},
            ${terciary},
            ${secondary},
            ${primary},
            ${secondary},
            ${terciary},
            ${secondary},
            ${primary}
          )`,
          }}
        ></div>
        <div className={styles.pattern}></div>
        <div className={styles.content}>
          <Link to={`/board?uuid=${markmap.uuid}`}>
            {detailView ? <DetailView {...markmap} /> : children}
          </Link>
          <div className={styles.panel}>
            <div className={styles.dashboard}>
              <button onClick={settingsButtonOnClick}>
                <i className={`fa-solid fa-screwdriver-wrench`}></i>&nbsp;
                Configuraciónes
              </button>
              <button onClick={toggleDetailView}>
                <i
                  className={`${
                    detailView
                      ? "fa-solid fa-rotate-left"
                      : "fa-solid fa-circle-info"
                  }`}
                ></i>
                &nbsp;
                {detailView ? "Volver" : "Ver Detalles"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Memo>
  );
};
