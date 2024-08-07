import styles from "./styles.module.css";
import {
  DefineForms,
  getHOHAndTrigger,
  INPUT_TYPES,
} from "../../components/DefineForms";
import { URL_API } from "../../services";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStateValue } from "../../context";
import { useToggle } from "../../hooks/useToggle";
import { SocketService } from "../../services";

const ManualCreation = ({}: any) => {
  const uuid = uuidv4();
  const navigate = useNavigate();
  const [{ markmaps }, dispatch]: any = useStateValue();
  const [markmapTitle, setMarkmapTitle] = useState("");
  const [onClickHandler, HOHTrigger]: any = getHOHAndTrigger(
    ({ setError: _, setLoading: __, data, reset: ___ }: any) => {
      const markmap = { ...data[0], uuid };
      fetch(`${URL_API}/markmap/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(markmap),
      })
        .then((data) => data.json())
        .then(({ created }) => {
          if (!created) return;
          dispatch({
            type: "setMarkmaps",
            payload: { ...markmaps, [uuid]: markmap },
          });
          dispatch({ type: "setCurrentModal", payload: null });
          navigate(`/board?uuid=${uuid}`);
        });
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
    <div className={`${styles.creation_form}`}>
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
        💡<strong>Tip 1:</strong> No es absolutamente necesario digitar por
        completo el markmap, puede ser completado desde el tablero, ubicado en
        la pagina&nbsp;<strong>Board</strong> y ver como el Mindmap va
        adquiriendo forma.
      </span>
      <span>
        💡<strong>Tip 2:</strong> El título del Mindmap será agregado
        automáticamente al markmap cuando este se digita, sin embargo, podra ser
        modificado en cualquier momento y permanecerá así siempre y cuando no se
        cambie el contenido en el formulario&nbsp;<strong>Título</strong>.
      </span>
    </div>
  );
};

const PromptCreation = ({ usefile: _usefile = false }: any) => {
  const [{ markmaps, file }, dispatch]: any = useStateValue();
  const [usefile, toogleUsefile] = useToggle(_usefile, !_usefile);
  const uuid = uuidv4();
  const navigate = useNavigate();

  const creationEndpoint = usefile
    ? `${URL_API}/markmap/createusingfileandprompt`
    : `${URL_API}/markmap/createusingprompt`;

  const [onClickHandler, HOHTrigger]: any = getHOHAndTrigger(
    ({ setError: _, setLoading: __, data, reset: ___ }: any) => {
      let body = {
        ...data[0],
        uuid,
        clientSocketID: SocketService.id,
      };
      if (usefile) {
        body = { ...body, file: file.split(",")[1], format: "base64" };
      }
      dispatch({
        type: "setMarkmaps",
        payload: { ...markmaps, [uuid]: { uuid, text: "", title: uuid } },
      });
      fetch(creationEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }).then((response) => response.json());
      dispatch({ type: "setCurrentModal", payload: null });
      navigate(`/board?uuid=${uuid}`);
    }
  );
  const baseSchema = {
    prompt: {
      inputType: INPUT_TYPES.PARAGRAPH,
      label: "Prompt",
      value: "",
    },
    topics: {
      inputType: INPUT_TYPES.TEXT,
      label: "Temas (Opcional)",
      value: "",
    },
  };
  return (
    <div className={`${styles.creation_form}`}>
      <DefineForms
        {...{
          baseSchema,
          onClickHandler,
          buttons: [],
          modifiable: false,
        }}
      ></DefineForms>
      {file && (
        <label>
          Usar archivo cargado como base de conocimiento
          <input
            type="checkbox"
            value={usefile}
            defaultChecked={usefile}
            onClick={toogleUsefile}
          ></input>
        </label>
      )}
      <button onClick={HOHTrigger}>
        <i className={`fa-solid fa-share-from-square`}></i> Enviar Prompt
      </button>
      <span>
        💡<strong>Tip 1:</strong> Se preciso, claro y detallado con respecto al
        tema con el que desees crear el <strong>Mindmap</strong>, entre mas
        informacion proveas mas preciso sera la respuesta.
      </span>
      <span>
        💡<strong>Tip 2:</strong> En el formulario&nbsp;<strong>Temas</strong>,
        digite los temas en los que se pretenda profundizar separados por una
        coma <strong>(,)</strong>, aunque no es un campo obligatorio.
      </span>
      {file && (
        <span>
          💡<strong>Tip 3:</strong> Marca la casilla&nbsp;
          <strong>Usar archivo cargado como base de conocimiento</strong> para
          usar el archivo cargado junto con el prompt y potenciar tu&nbsp;
          <strong>Mindmap</strong>
        </span>
      )}
    </div>
  );
};

export const MarkmapCreationForm = ({ usefile = false }: any) => {
  const [manual, toggleManual] = useToggle(false, true);
  return (
    <div className={styles.form_body}>
      <button onClick={toggleManual}>
        <i className={manual ? "fa-solid fa-robot" : "fa-solid fa-pencil"}></i>
        &nbsp;&nbsp;
        {manual ? "Crear mediante Prompt" : "Crear Manualmente"}
      </button>
      {manual ? <ManualCreation /> : <PromptCreation usefile={usefile} />}
    </div>
  );
};
