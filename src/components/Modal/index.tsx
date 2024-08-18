import { Children, cloneElement } from "react";
import styles from "./styles.module.css";

export const Modal = ({
  children,
  active = false,
  onClick = null,
  over = true,
  showCloseButton = true,
}: any) => {
  return (
    <div
      className={`${styles.modal} 
      ${active || children ? styles.active : styles.inactive} 
      ${active || children && over ? styles.over : ""}`}
      id="modal_body"
      onClick={(e: any) => {
        if (e.target.id === "modal_body") onClick(null);
      }}
    >
      <div className={styles.main_container}>
        {Children.toArray(children).map((child: any) =>
          cloneElement(child, {
            ...child.props,
            disabled: true,
            style: { maxHeight: "90vh" },
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
