import styles from "./styles.module.css";
import { useRef, cloneElement, Children, useEffect } from "react";

export const TextareaMagicButton = ({ children }: any) => {
  if (children.type !== "textarea") return children;
  const { ref } = children;
  const nativeRef = useRef(null);
  const buttonRef: any = useRef(null);
  const hiddenDivRef: any = useRef(null);
  const textareaRef = ref || nativeRef;

  useEffect(() => {
    if (!hiddenDivRef.current) return;
    if (!textareaRef.current) return;
    if (!buttonRef.current) return;
    textareaRef.current.addEventListener("mouseup", () => {
      const selectedText = textareaRef.current.value
        .substring(
          textareaRef.current.selectionStart,
          textareaRef.current.selectionEnd
        )
        .trim();
      if (!selectedText) return (buttonRef.current.style.display = "none");
      const textareaStyle = window.getComputedStyle(textareaRef.current);
      hiddenDivRef.current.style.width = textareaRef.current.offsetWidth + "px";
      hiddenDivRef.current.style.height =
        textareaRef.current.offsetHeight + "px";
      hiddenDivRef.current.style.font = textareaStyle.font;
      hiddenDivRef.current.style.lineHeight = textareaStyle.lineHeight;
      hiddenDivRef.current.style.padding = textareaStyle.padding;
      hiddenDivRef.current.style.border = textareaStyle.border;
      hiddenDivRef.current.textContent = textareaRef.current.value.substring(
        0,
        textareaRef.current.selectionStart
      );
      const span = document.createElement("span");
      span.textContent = textareaRef.current.value.substring(
        textareaRef.current.selectionStart,
        textareaRef.current.selectionEnd
      );
      hiddenDivRef.current.appendChild(span);
      const spanRect = span.getBoundingClientRect();
      buttonRef.current.style.display = "block";
      buttonRef.current.style.left = `${spanRect.right - 70}px`; // TODO check this values
      buttonRef.current.style.top = `${spanRect.top - 90}px`;
    });
  }, [textareaRef.current]);

  return (
    <>
      <div className={styles.wrapper}>
        {Children.toArray(children).map((child: any) =>
          cloneElement(child, { ...child.props, ref: textareaRef })
        )}

        <div ref={hiddenDivRef} className={styles.hidden_div}></div>
      </div>
      <button
        ref={buttonRef}
        className={`fa-solid fa-wand-magic-sparkles ${styles.floating_button}`}
      ></button>
    </>
  );
};
