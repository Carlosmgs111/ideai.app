import styles from "./styles.module.css";
import { DragNDropZone } from "../../components";
import config from "../../config";
import { useStateValue } from "../../context";
import { useNavigate } from "react-router-dom";
import { SocketService } from "../../services";
import { v4 as uuidv4 } from "uuid";

export const Home = ({}: any) => {
  const [{ markmaps }, dispatch]: any = useStateValue();
  const navigate = useNavigate();
  const uploadFileCallback = (e: any, { files }: any) => {
    e.preventDefault();
    const uuid = uuidv4();
    dispatch({
      type: "setMarkmaps",
      payload: { ...markmaps, [uuid]: { uuid, text: "", title: uuid } },
    });
    dispatch({ type: "setMarkmap", payload: "" });
    if (!files[0]) return;
    fetch(`${config.prodUrl}/markmap/transformfiletomarkmap`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        format: "base64",
        payload: files[0].split(",")[1],
        clientSocketID: SocketService.id,
        uuid,
      }),
    }).then((response) => {
      response.json();
    });
    navigate(`/board?uuid=${uuid}`);
  };
  return (
    <div className={styles.page}>
      <div className={styles.hero}>
        <h1>Gráfica y Visualiza tus ideas con Mindmaps </h1>
        <article>
          Crea tus Mindmaps desde cero o subiendo un archivo PDF, puedes
          personalizarlos y obtener ayuda de nuestras AI's para sacar el maximo
          provecho a tus ideas, comparte y colabora con otros para llevar al
          siguiente nivel tu ideas.
        </article>
        <div>
          <button className={`${styles.button} ${styles.main_button}`}>
            <i className="fa-solid fa-diagram-project"></i> Crea Mindmap desde
            Cero
          </button>
          <button className={`${styles.button} ${styles.secondary_button}`}>
            Aprende Más
          </button>
        </div>
        <span>O puedes</span><DragNDropZone uploadFile={uploadFileCallback}></DragNDropZone>
      </div>
    </div>
  );
};
