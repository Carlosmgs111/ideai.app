import styles from "./styles.module.css";
import { useStateValue } from "../context";

export const Preview = ({ children }: any) => {
  const [{}, dispatch]: any = useStateValue();
  const settingsButtonOnClick = () => {
    dispatch({ type: "setCurrentModal", payload: <div>HOLA</div> });
  };
  return (
    <div className={styles.container}>
      <a href={`/board?uuid=${children.props.uuid}`}>{children}</a>
      <div className={styles.panel}>
        <h3>{children.props.title}</h3>
        <div className={styles.dashboard}>
          <button onClick={settingsButtonOnClick}>
            <i className={`fa-solid fa-screwdriver-wrench`}></i> Configuraciones
          </button>
          <button>
            <i className={`fa-solid fa-trash-can`}></i> Eliminar Mindmap
          </button>
        </div>
      </div>
    </div>
  );
};
