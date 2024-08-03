import styles from "./styles.module.css";
import { URL_API } from "../../services";
import { useStateValue } from "../../context";

export const MarkmapPreviewDashboard = ({ uuid, title }: any) => {
  const [{ markmaps }, dispatch]: any = useStateValue();
  const onClickDeleteButton = () => {
    dispatch({ type: "setLoading", payload: true });
    fetch(`${URL_API}/markmap/delete`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ uuid }),
    })
      .then((data) => data.json())
      .then((response) => {
        const { deleted } = response;
        if (!deleted) return;
        delete markmaps[uuid];
        dispatch({ type: "setCurrentModal", payload: null });
        dispatch({ type: "setMarkmaps", payload: {...markmaps} });
      });
  };
  return (
    <div className={styles.dashboard_body}>
      <h1>{title}</h1>

      <article>
        Aqui van a ir todas las configuraciones relacionadas a la administracion
        de cada Mindmap, como por ejemplo la personalizacion, la asociacion a
        otros Mindmaps, la visibilidad, es decir si son publicas o privadas, el
        manejo en ambitos de propiedad intelectual, como por ejemplo si se trata
        de contenido protegido o referenciado a terceros, manejo de exportacion,
        habilitacion de colaboradores, administracion de etiquetas entre otras
        mas.
      </article>

      <section className={styles.section}>
        <div>
          <div>🏷️</div>
          <div>🎚️</div>
        </div>
      </section>
      <section className={styles.section}>
        <div>
          <span></span>
          <button onClick={onClickDeleteButton} className={`${styles.caution}`}>
            <i className={`fa-solid fa-trash-can`}></i> Eliminar este Mindmap
          </button>
        </div>
      </section>
    </div>
  );
};
