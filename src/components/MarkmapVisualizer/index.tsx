import "markmap-toolbar/dist/style.css";
import { useRef, useEffect, useReducer } from "react";
import { useDebounce } from "../../hooks/useDebounce";
import { Markmap, deriveOptions } from "markmap-view";
import { Toolbar } from "markmap-toolbar";
import { loadCSS, loadJS } from "markmap-common";
import { Transformer } from "markmap-lib";
import styles from "./styles.module.css";
import { useStateValue } from "../../context";
import { SocketService } from "../../services";

const transformer = new Transformer();
const { scripts, styles: TStyles }: any = transformer.getAssets();
loadCSS(TStyles);
loadJS(scripts);

const renderToolbar = (markMap: Markmap, wrapper: HTMLElement) => {
  while (wrapper?.firstChild) wrapper.firstChild.remove();
  if (markMap && wrapper) {
    const toolbar = new Toolbar();
    toolbar.attach(markMap);
    toolbar.register({
      id: "alert",
      title: "Click to show an alert",
      content: "Alert",
      onClick: () => alert("You made it!"),
    });
    toolbar.setItems([...Toolbar.defaultItems, "alert"]);
    wrapper.append(toolbar.render());
  }
};

export const MarkmapVisualizer = ({
  uuid,
  text: markmapText,
  preview = false,
}: any) => {
  const [{ markmaps }, dispatch]: any = useStateValue();
  const refSvg = useRef<any>();
  const refMm = useRef<any>();
  const refToolbar = useRef<any>();
  const [text, textDispatch]: any = useReducer(
    (prevText: any, text: any) => (prevText += text),
    markmapText
  );
  const debouncedText = useDebounce(text, 100);
  const markmapOptions = deriveOptions({
    maxWidth: 300,
    initialExpandLevel: preview ? 2 : -1,
    extraCss: [styles.board],
    // color: ["#F7F052", "#F28123", "#D34E24", "#563F1B", "#38726C"],
  });

  useEffect(() => {
    SocketService.receiveMessage({
      core: {
        [`appendToMarkmapText$${uuid}`]: async (updatedMarkmap: any) => {
          const { text: chunk, title } = updatedMarkmap;
          if (String(title) === String(uuid)) {
            dispatch({
              type: "setMarkmaps",
              payload: { ...markmaps, [uuid]: { ...markmaps[uuid], title } },
            });
          }
          textDispatch(chunk);
        },
      },
    });
  }, []);

  useEffect(() => {
    dispatch({
      type: "setMarkmaps",
      payload: { ...markmaps, [uuid]: { ...markmaps[uuid], text } },
    });
  }, [debouncedText]);

  useEffect(() => {
    if (refMm.current) return;
    const markMap = Markmap.create(refSvg.current, markmapOptions);
    refMm.current = markMap;
    renderToolbar(refMm.current, refToolbar.current);
  }, [refSvg.current, preview, markmapOptions]);

  useEffect(() => {
    const markMap = refMm.current;
    if (!markMap) return;
    const { root } = transformer.transform(markmapText);
    markMap.setData(root);
    markMap.fit();
  }, [refMm.current, markmapText]);

  const handleChange = (e: any) => {
    dispatch({
      type: "setMarkmaps",
      payload: {
        ...markmaps,
        [uuid]: { uuid, text: e.target.value },
      },
    });
  };

  return (
    <div className={`${styles.visualizer} ${preview ? styles.preview : ""}`}>
      <div className={`${styles.editor} ${preview ? styles.hidden : ""}`}>
        <textarea className="" value={markmapText} onChange={handleChange} />
      </div>
      <svg
        className={styles.board}
        style={{
          color: preview ? "var(--main-color-950)" : "var(--main-color-950)",
        }}
        ref={refSvg}
      />

      <div className={`${styles.toolbar} ${preview ? styles.hidden : ""}`}>
        <div ref={refToolbar}></div>
      </div>
    </div>
  );
};
