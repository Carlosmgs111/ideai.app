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
    ({ setError: _, setLoading: __, data, reset: ___ }: any) => {
      fetch(`${URL_API}/markmap/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data[0], uuid: uuidv4() }),
      })
        .then((data) => data.json())
        .then((result) => console.log({ result }));
    }
  );
  let prevTitle = "";
  const onChangeHandler = (state: any) => {
    const { title, text } = state;
    if (title.controlledValue === prevTitle) return state;
    prevTitle = title.controlledValue;
    const splittedText = text.controlledValue.split("\n");
    if (splittedText[0] === `# ${title.controlledValue}`) return state;
    splittedText.splice(0, 1);
    const spreadText = text.controlledValue.includes("\n")
      ? splittedText.join("\n")
      : text.controlledValue;
    return {
      ...state,
      text: {
        ...text,
        controlledValue: `# ${title.controlledValue}\n${spreadText}`,
      },
    };
  };
  const baseSchema = {
    title: {
      inputType: INPUT_TYPES.TEXT,
      label: "Título",
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
        {...{
          onClickHandler,
          onChangeHandler,
          baseSchema,
          buttons: [],
          modifiable: false,
        }}
      ></DefineForms>
      <button onClick={HOHTrigger}>
        <i className={`fa-solid fa-floppy-disk`}></i> Guardar Nuevo Markmap
      </button>
      <span>
        <mark>
          Nota: No es absolutamente necesario completar el texto, puedes
          completarlo desde el tablero (Board) y ver como tu Mindmap va
          adquiriendo forma.
        </mark>
      </span>
    </div>
  );
};
