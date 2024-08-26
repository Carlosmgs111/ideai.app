import { Children, cloneElement } from "react";
import styles from "./styles.module.css";

export const Modal = ({
  children,
  active = false,
  onClick = null,
  over = true,
  showCloseButton = true,
  theme,
  from = "",
  props = {},
}: any) => {
  const className = [
    styles.modal,
    styles[theme],
    styles[from],
    active ? styles.active : styles.inactive,
    active && over ? styles.over : "",
  ]
    .filter(Boolean)
    .join(" ");
  return (
    <div
      className={className}
      id="modal_body"
      onClick={(e: any) => {
        if (e.target.id === "modal_body") onClick(null);
      }}
    >
      <div className={styles.main_container}>
        {Children.toArray(children).map((child: any) =>
          cloneElement(child, {
            ...props,
          })
        )}
        {showCloseButton && (
          <div className={styles.button_container}>
            <i
              className={`fa-solid fa-xmark ${styles.close_button}`}
              onClick={() => onClick(null)}
            />
          </div>
        )}
      </div>
    </div>
  );
};
