import { useEffect, useState } from "react";
import { InputHelper } from "../../../../components/InputHelper";
import { beutifyLabel, genRandomId } from "../../../../utils";
import { INPUT_TYPES } from "../../../../components/DefineForms";
import styles from "./styles.module.css";

export const ParagraphInput = ({
  name,
  idx,
  text,
  label,
  onChange,
  showLabel = true,
  required = false,
}: any) => {
  const [textArea, setTextArea]: any = useState(null);
  const id = `text_input_${idx}_${genRandomId()}`;

  const autoGrow = () => {
    if (textArea) {
      textArea.style.height = "auto";
      textArea.style.height = textArea.scrollHeight + "px";
    }
  };

  useEffect(() => {
    if (textArea) {
      autoGrow();
      textArea.addEventListener("input", autoGrow);
      return;
    }
    setTextArea(document.getElementById(id));
  }, [textArea]);

  return (
    <>
      {required && <InputHelper />}
      <div className={styles.input_text} key={idx}>
        <textarea
          className={styles.textarea}
          wrap="hard"
          id={id}
          rows={1}
          name={idx}
          value={text}
          onChange={(e: any) => {
            onChange(name, e.target, INPUT_TYPES.PARAGRAPH);
          }}
          placeholder={beutifyLabel(label || name)}
        />
        {showLabel && <label>{name}</label>}
      </div>
      <label className={styles.label}>{beutifyLabel(label || name)}</label>
    </>
  );
};
