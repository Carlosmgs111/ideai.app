import styles from "./styles.module.css";
import { TextEditor } from "../../components/TextEditor";

export const MarkmapVisualizerEditor = ({
  text,
  handleChange,
  hide,
  toggleHide,
  autosave = true,
  toggleAutosave,
}: any) => {
  return (
    <div className={`${styles.dashboard} ${hide && styles.hide}`}>
      <div className={styles.header}>
        <button
          className={`fa-solid fa-caret-left ${styles.button}`}
          onClick={toggleHide}
        ></button>
        <span></span>
        <label
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          Autoguardado {/*  */}
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
          <TextEditor {...{ value: text, onChange: handleChange }}></TextEditor>
        </div>
      </div>
    </div>
  );
};
