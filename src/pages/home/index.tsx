import styles from "./styles.module.css";
import { DragNDropZone } from "../../components";
import config from "../../config";
import { useStateValue } from "../../context";
import { useNavigate } from "react-router-dom";
import { MarkmapCreationForm } from "../../containers/MarkmapCreationForm";
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
      payload: { [uuid]: { uuid, text: "", title: "" }, ...markmaps },
    });

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
    })
      .then((response) => {
        response.json();
      })
      .then(({ created }: any) => {
        if (!created) return;
      });
    navigate(`/board?uuid=${uuid}`);
  };
  return (
    <div className={styles.page}>
      <div className={styles.hero}>
        <h1>Organiza y Visualiza tus ideas con Mindmaps </h1>
        <article>
          Crea, gestiona y comparte tus&nbsp;<strong>Mindmaps</strong>
          &nbsp;fácilmente. Extrae información directamente desde tus
          archivos&nbsp;
          <strong>PDF</strong> o empieza desde cero usando&nbsp;
          <strong>Markmap</strong>. ¡Empieza ahora y visualiza tus ideas
          potenciadas por nuestras&nbsp;<strong>IA's</strong>!
        </article>
        <div>
          <button
            onClick={() =>
              dispatch({
                type: "setCurrentModal",
                payload: <MarkmapCreationForm />,
              })
            }
            className={`${styles.button} `}
          >
            <i className="fa-solid fa-diagram-project"></i> Crea Mindmap desde
            Cero
          </button>
          <button
            className={`${styles.button}`}
            onClick={() => navigate("/learn/markmap")}
          >
            <i className={`fa-solid fa-book`}></i> Aprende sobre Markmap
          </button>
        </div>
        <span>O puedes...</span>
        <div>
          <DragNDropZone uploadFile={uploadFileCallback}></DragNDropZone>
        </div>
      </div>
      <section className={styles.about}>
        <article>
          <h3>Changelog</h3>
          <ul>
            <li>
              <span>
                Ahora sin importar el metodo de creacion de un&nbsp;
                <strong>Mindmap</strong>, una vez inicie el proceso de creacion,
                la aplicacion automaticamente se redirigira hacia la
                pagina&nbsp;<strong>Board</strong>, ubicando automaticamente
                el&nbsp;
                <strong>Mindmap</strong> en cuestion, el recien creado.
              </span>
            </li>
            <li>
              <span>
                Los Mindmaps pueden ahora ser eliminados desde la pagina&nbsp;
                <strong>Mindmaps</strong>, solo hay que ubicar el Mindmap a
                eliminar, dar click en el boton que dice&nbsp;
                <strong>
                  [&nbsp;
                  <i className="fa-solid fa-screwdriver-wrench"></i>
                  Configuraciónes &nbsp;]
                </strong>
                , lo cual abrira un modal donde se podra ubicar un boton que
                indicara la accion de eliminar.
              </span>
            </li>
            <li>
              <span>
                Ahora, en el modal desplegado para la creacion de un nuevo&nbsp;
                <strong>Mindmap</strong>, &nbsp;
                <strong>
                  [&nbsp;
                  <i className="fa-solid fa-diagram-project"></i> Crea Mindmap
                  desde Cero&nbsp;]
                </strong>
                se puede intercambiar el metodo de creacion, entre forma
                manual&nbsp;
                <strong>
                  [&nbsp;
                  <i className="fa-solid fa-pencil"></i> Crear
                  Manualmente&nbsp;]
                </strong>
                &nbsp; y usando prompt&nbsp;
                <strong>
                  [&nbsp;
                  <i className="fa-solid fa-robot"></i> Crear mediante
                  Prompt&nbsp;]
                </strong>
                .
              </span>
            </li>
            <li>
              <span>Mas cambios en camino...</span>
            </li>
          </ul>
        </article>
      </section>
    </div>
  );
};
