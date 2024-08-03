import styles from "./styles.module.css";
import {
  DefineForms,
  getHOHAndTrigger,
  INPUT_TYPES,
} from "../../components/DefineForms";
import { URL_API } from "../../services";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";

export const MarkmapCreationForm = () => {
  const [markmapTitle, setMarkmapTitle] = useState("");
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
  const onChangeHandler = (state: any) => {
    const { title, text } = state;
    if (title.controlledValue === markmapTitle) return state;
    setMarkmapTitle(title.controlledValue);
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
      label: "Markmap",
      value: "",
    },
    description: {
      inputType: INPUT_TYPES.PARAGRAPH,
      label: "Descripción (Opcional)",
      value: "",
    },
  };
  return (
    <div className={styles.form_body}>
      <h2>{markmapTitle}</h2>
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
        <i className={`fa-solid fa-floppy-disk`}></i> Guardar Mindmap
      </button>
      <span>
        💡Tip 1: No es absolutamente necesario digitar por completo el markmap,
        puedes completarlo desde el tablero (Board) y ver como tu Mindmap va
        adquiriendo forma.
      </span>
      <span>
        💡Tip 2:  El título del Mindmap será agregado automáticamente al markmap
        cuando este se digita, sin embargo, podrás modificarlo en cualquier
        momento y permanecerá así siempre y cuando no cambies el título.
      </span>
    </div>
  );
};
