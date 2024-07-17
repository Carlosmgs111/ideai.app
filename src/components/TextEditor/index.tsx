import styles from "./styles.module.css";
import { useRef, useState, useEffect } from "react";

export const TextEditor = ({ value, onChange }: any) => {
  const textContainerRef: any = useRef(null);
  const [text, setText] = useState(value);
  const [top, setTop] = useState(false);
  const [bottom, setBottom] = useState(false);
  const textareaRef: any = useRef(null);

  const autoGrow = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "100%";
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + "px";
    }
  };

  const checkOverflow = () => {
    console.log("scrolling");
    try {
      const { scrollTop, scrollHeight, clientHeight } =
        textContainerRef.current;
      if (scrollTop > 0) setTop(true);
      else setTop(false);
      if (scrollTop + clientHeight + 4 <= scrollHeight) setBottom(true);
      else setBottom(false);
    } catch (e: any) {
      console.error(e.message);
    }
  };
  useEffect(() => {
    if (textContainerRef.current) {
      textContainerRef.current.addEventListener("scroll", checkOverflow);
      window.addEventListener("resize", checkOverflow);
      window.addEventListener("DOMContentLoaded", checkOverflow);
    }
  }, [textContainerRef.current]);
  useEffect(() => {
    if (textareaRef.current) {
      autoGrow();
      textareaRef.current.addEventListener("input", autoGrow);
      return;
    }
  }, [value]);
  return (
    <form className={styles.form}>
      <div
        className={`
            ${styles["scroll-shadow"]} 
            ${styles["shadow-top"]} 
            ${top ? styles.show : ""}`}
      ></div>
      <div ref={textContainerRef} className={styles.container}>
        <textarea
          ref={textareaRef}
          wrap="hard"
          id="texteditor"
          className={styles.textarea}
          value={value}
          onChange={(e: any) => {
            e.preventDefault();
            setText(e.target.value);
            onChange(e);
          }}
        />
      </div>
      <div
        className={`
          ${styles["scroll-shadow"]} 
          ${styles["shadow-bottom"]} 
          ${bottom ? styles.show : ""}`}
      ></div>
    </form>
  );
};
