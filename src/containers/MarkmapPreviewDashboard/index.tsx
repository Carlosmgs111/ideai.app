import styles from "./styles.module.css";
import { URL_API } from "../../services";
import { useStateValue } from "../../context";
import {
  CommonInput,
  ParagraphInput,
} from "../../components/DefineForms/inputs";
import { useReduceState } from "../../hooks/useReduceState";
import { useAxiosRequest } from "../../hooks/useAxiosRequest";
import { PatternBackground } from "../../components/PatternBackground";

export const MarkmapPreviewDashboard = (markmap: any) => {
  const [{ markmaps, theme }, dispatch]: any = useStateValue();
  const [markmapState, setMarkmapState] = useReduceState(markmap);
  const { uuid, title, description = "" } = markmapState;
  const onClickDeleteButton = (e: any) => {
    e.preventDefault();
    const result = window.confirm(
      ` ⚠️ El Mindmap ${title} una vez eliminado no se podra recuperar, ¿Esta seguro de seguir? ⚠️ `
    );
    if (!result) return;
    dispatch({ loading: true });
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
        dispatch({ currentModal: null });
        dispatch({ markmaps: { ...markmaps } });
      });
  };
  const onClickUpdateTitle = (e: any) => {
    e.preventDefault();
    useAxiosRequest({
      setData: ({ updated }: any) => {
        if (!updated) return;
        dispatch({
          markmaps: { ...markmaps, [uuid]: { ...markmap, title } },
        });
      },
    }).patch("markmap/update", { uuid, title });
  };

  const onClickUpdateDescription = (e: any) => {
    e.preventDefault();
    useAxiosRequest({
      setData: ({ updated }: any) => {
        if (!updated) return;
        dispatch({
          markmaps: { ...markmaps, [uuid]: { ...markmap, description } },
        });
      },
    }).patch("markmap/update", { uuid, description });
  };
  return (
    <div style={{borderRadius:"1.6rem"}}>
      <PatternBackground tiny>
        <div className={`${styles.dashboard_body} ${styles[theme]}`}>
          <h1>{title}</h1>
          <form className={styles.section}>
            <CommonInput
              label="Título"
              value={title}
              onChange={(_: any, target: any) => {
                setMarkmapState({ title: target.value });
              }}
            ></CommonInput>
            <button onClick={onClickUpdateTitle}>
              <i className="fa-solid fa-check"></i>&nbsp;&nbsp;Actualizar
            </button>
          </form>
          <form className={styles.section}>
            <ParagraphInput
              label="Descripción"
              text={description}
              onChange={(_: any, target: any) => {
                setMarkmapState({ description: target.value });
              }}
            ></ParagraphInput>
            <button onClick={onClickUpdateDescription}>
              <i className="fa-solid fa-check"></i>&nbsp;&nbsp;Actualizar
            </button>
          </form>
          <div className={styles.division}></div>
          <section className={styles.section}>
            <div>
              <span></span>
              <button
                onClick={onClickDeleteButton}
                className={`${styles.caution}`}
              >
                <i className={`fa-solid fa-trash-can`}></i> Eliminar este
                Mindmap
              </button>
            </div>
          </section>
        </div>
      </PatternBackground>
    </div>
  );
};
