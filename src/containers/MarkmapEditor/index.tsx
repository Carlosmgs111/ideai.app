import styles from "./styles.module.css";
import { TextEditor } from "../../components/TextEditor";
import { useStateValue } from "../../context";

export const MarkmapEditor = ({
  text,
  handleChange,
  autosave = true,
  toggleAutosave,
}: any) => {
  const [{ theme }]: any = useStateValue();
  return (
    <div className={`${styles.dashboard} ${styles[theme]}`}>
      <div className={styles.header}>
        <span></span>
        <label
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          Autoguardado: &nbsp;
          <input
            type="checkbox"
            value={autosave}
            defaultChecked={autosave}
            onClick={toggleAutosave}
          ></input>
        </label>
      </div>

      <div>
        <div className={`${styles.editor}`}>
          <TextEditor
            {...{ value: text, theme, onChange: handleChange }}
          ></TextEditor>
        </div>
      </div>
    </div>
  );
};
