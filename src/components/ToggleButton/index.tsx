import styles from "./styles.module.css";
import { useEffect, useRef } from "react";

export const ToggleButton = ({
  checked,
  onChange,
  toggled = "var(--main-color-400)",
  unToggled = "var(--moonlit-asteroid-800)",
}: any) => {
  const ref: any = useRef(null);
  useEffect(() => {
    if (!ref.current) return;
    ref.current.style.setProperty("--background", unToggled);
    ref.current.style.setProperty("--background-checked", toggled);
  }, [ref]);
  return (
    <form>
      <label ref={ref} className={`switch ${styles.switch}`}>
        <input
          className={styles.input}
          checked={checked}
          type="checkbox"
          name="based-on"
          onChange={onChange}
        ></input>
        <span
          className={`${styles.slider} ${styles.round} fa-solid fa-circle-dot`}
        ></span>
      </label>
    </form>
  );
};
