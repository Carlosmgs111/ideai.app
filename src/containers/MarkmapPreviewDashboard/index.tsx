import styles from "./styles.module.css";
import { URL_API } from "../../services";
import { useStateValue } from "../../context";
import { CommonInput } from "../../components/DefineForms/inputs";
import { useReduceState } from "../../hooks/useReduceState";
import { useAxiosRequest } from "../../hooks/useAxiosRequest";

export const MarkmapPreviewDashboard = (markmap: any) => {
  const [{ markmaps }, dispatch]: any = useStateValue();
  const [markmapState, setMarkmapState] = useReduceState(markmap);
  const { uuid, title } = markmapState;
  const onClickDeleteButton = () => {
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
          markmaps: { ...markmaps, [uuid]: { ...markmaps[uuid], title } },
        });
      },
    }).patch("markmap/update/title", { uuid, title });
  };
  return (
    <div className={styles.dashboard_body}>
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
