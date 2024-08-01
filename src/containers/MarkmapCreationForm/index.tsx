import styles from "./styles.module.css";
import {
  DefineForms,
  getHOHAndTrigger,
  INPUT_TYPES,
} from "../../components/DefineForms";
import { URL_API } from "../../services";
import { v4 as uuidv4 } from "uuid";

export const MarkmapCreationForm = () => {
  const [onClickHandler, HOHTrigger]: any = getHOHAndTrigger(
    ({ setError, setLoading, data, reset }: any) => {
      fetch(`${URL_API}/markmap/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data[0], uuid: uuidv4() }),
      })
        .then((data) => data.json())
        .then((result) => console.log({ result }));
    }
  );
  const baseSchema = {
    title: {
      inputType: INPUT_TYPES.TEXT,
      label: "Titulo",
      value: "",
    },
    text: {
      inputType: INPUT_TYPES.PARAGRAPH,
      label: "Texto",
      value: "",
    },
    description: {
      inputType: INPUT_TYPES.PARAGRAPH,
      label: "Descripción",
      value: "",
    },
  };
  return (
    <div className={styles.form_body}>
      <DefineForms
        {...{ onClickHandler, baseSchema, buttons: [] }}
      ></DefineForms>
      <button onClick={HOHTrigger}>
        <i className={`fa-solid fa-floppy-disk`}></i> Guardar Nuevo Markmap
      </button>
    </div>
  );
};
