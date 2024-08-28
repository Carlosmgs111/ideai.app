import styles from "./styles.module.css";
import { TextEditor } from "../../components/TextEditor";
import { useStateValue } from "../../context";
import { PatternBackground } from "../../components/PatternBackground";

export const MarkmapEditor = ({
  text,
  handleChange,
  autosave = true,
  toggleAutosave,
}: any) => {
  const [{ theme }]: any = useStateValue();

  return (
    <div style={{ borderRadius: ".8rem" }}>
      <PatternBackground tiny>
        <div className={`${styles.container} ${styles[theme]}`}>
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
                {...{
                  value: text,
                  theme,
                  onChange: handleChange,
                }}
              ></TextEditor>
            </div>
          </div>
        </div>
      </PatternBackground>
    </div>
  );
};
