import { Children, cloneElement, useEffect, useState } from "react";
import styles from "./styles.module.css";

type setState = [boolean | null, Function];

export const Modal = ({
  children,
  active = false,
  onClick = null,
  over = true,
  showCloseButton = true,
}: any) => {
  const [isActive, setIsActive]: setState = useState(null);
  const [element, setElement]: setState = useState(null);
  useEffect(() => {
    setElement(children);
    setIsActive(active || Boolean(children));
  }, [children]);
  return (
    <div
      className={`${styles.modal} 
      ${isActive ? styles.active : ""} 
      ${isActive && over ? styles.over : ""}`}
      id="modal_body"
      onClick={(e: any) => {
        if (e.target.id === "modal_body") onClick(null);
      }}
    >
      <div className={styles.main_container}>
        {Children.toArray(element).map((child: any) =>
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
              onClick={() => {
                setElement(null);
                setIsActive(false);
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};
