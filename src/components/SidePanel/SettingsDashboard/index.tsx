import styles from "./styles.module.css";
import { ToggleButton } from "../../../components/ToggleButton";

export function SettingsDashboard({
  float,
  switchFloat,
  settingsDashboard,
  switchSettingsDashboard,
}: any) {
  return (
    <div className={styles.container}>
      <section
        className={`${styles.dashboard} ${
          settingsDashboard ? styles.show : ""
        }`}
        onClick={switchSettingsDashboard}
      >
        <i className={`fa-solid fa-caret-left ${styles.hide_button}`} />
        <span>Flotante: </span>
        <ToggleButton
          {...{ checked: float, onChange: switchFloat }}
        ></ToggleButton>
      </section>
    </div>
  );
}
