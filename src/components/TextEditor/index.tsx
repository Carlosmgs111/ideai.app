import styles from "./styles.module.css";
import { useRef, useState, useEffect } from "react";
import { TextareaMagicButton } from "../MagicButton";

export const TextEditor = ({
  value,
  onChange,
  theme,
  $textareaRef = null,
}: any) => {
  const nativeTextareaRef = useRef(null);
  const containerRef: any = useRef(null);
  const textareaRef: any = $textareaRef || nativeTextareaRef;
  const [top, setTop] = useState(false);
  const [bottom, setBottom] = useState(false);
  const [text, setText] = useState(value);
  const autoGrow = (preAdjust = false) => {
    if (!textareaRef.current) return;
    if (preAdjust) textareaRef.current.style.height = "auto";
    textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";
  };
  const checkOverflow = () => {
    if (!containerRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
    try {
      if (scrollTop > 0) setTop(true);
      else setTop(false);
      if (scrollTop + clientHeight + 4 <= scrollHeight) setBottom(true);
      else setBottom(false);
    } catch (e: any) {
      console.error(e.message);
    }
  };
  useEffect(() => {
    containerRef.current.addEventListener("keydown", (event: any) =>
      event.stopPropagation()
    );
    if (containerRef.current) {
      containerRef.current.addEventListener("scroll", checkOverflow);
      window.addEventListener("resize", checkOverflow);
      window.addEventListener("DOMContentLoaded", checkOverflow);
      autoGrow();
      textareaRef.current.addEventListener("input", () => autoGrow());
    }
  }, []);
  useEffect(() => {
    setText(value);
  }, [value]);

  return (
    <div className={`${styles.form} ${styles[theme]}`}>
      <div
        className={`

            ${styles["scroll-shadow"]}
            ${styles["shadow-top"]}
            ${top ? styles.show : ""}`}
      ></div>
      <div ref={containerRef} className={styles.container}>
        <TextareaMagicButton>
          <textarea
            ref={textareaRef}
            wrap="hard"
            id="texteditor"
            className={styles.textarea}
            value={text}
            onChange={(e: any) => {
              e.preventDefault();
              setText(e.target.value);
              onChange(e);
            }}
          />
        </TextareaMagicButton>
      </div>
      <div
        className={`
          ${styles["scroll-shadow"]}
          ${styles["shadow-bottom"]}
          ${bottom ? styles.show : ""}`}
      ></div>
    </div>
  );
};
