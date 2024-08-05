import "markmap-toolbar/dist/style.css";
import { useRef, useEffect, useReducer, useState } from "react";
import { useDebounce } from "../../hooks/useDebounce";
import { Markmap, deriveOptions } from "markmap-view";
import { Toolbar } from "markmap-toolbar";
import { loadCSS, loadJS } from "markmap-common";
import { Transformer } from "markmap-lib";
import styles from "./styles.module.css";
import { useStateValue } from "../../context";
import { SocketService, URL_API } from "../../services";
import { useNearScreen } from "../../hooks/useNearScreen";
import { MarkmapVisualizerEditor } from "../MarkmapVisualizerEditor";
import { useToggle } from "../../hooks/useToggle";

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
  autosave: _autosave = true,
  title,
}: any) => {
  const [{ markmaps }, dispatch]: any = useStateValue();
  const [text, setText]: any = useState(markmapText);
  const [autosave, toggleAutosave] = useToggle(_autosave, !_autosave);
  const debouncedText = useDebounce(text, 500);
  const [refVisualizer, showVisualizer] = useNearScreen(false);
  const refSvg = useRef<any>();
  const refMm = useRef<any>();
  const refToolbar = useRef<any>();
  const [composedText, composedTextDispatch]: any = useReducer(
    (prevText: any, text: any) => (prevText += text),
    markmapText
  );
  const [hideDashboard, toggleHideDashboard] = useToggle(true, false);
  const debouncedComposedText = useDebounce(composedText, 100);
  const markmapOptions = deriveOptions({
    maxWidth: 800,
    initialExpandLevel: preview ? 2 : -1,
    colorFreezeLevel: 3,
    // color: ["#845EC2", "#D65DB1", "#FF6F91", "#FF9671", "#FFC75F", "#F9F871"],
  });
  const saveText = (text: any) => {
    fetch(`${URL_API}/markmap/update`, {
      method: "PUT",
      body: JSON.stringify({ text, uuid }),
      headers: {
        "Content-Type": "application/json",
        // authorization: `Bearer ${token}`,
      },
    })
      .then((data) => data.json())
      .then(({ updated }) => {
        updated;
      });
  };

  useEffect(() => {
    SocketService.receiveMessage({
      core: {
        [`appendToMarkmapText$${uuid}`]: async (updatedMarkmap: any) => {
          const { text: chunk, title } = updatedMarkmap;
          dispatch({
            type: "setMarkmaps",
            payload: { ...markmaps, [uuid]: { ...markmaps[uuid], title } },
          });
          composedTextDispatch(chunk);
        },
      },
    });
  }, []);

  useEffect(() => {
    setText(composedText);
    if (markmaps[uuid].text === composedText) return;
    dispatch({
      type: "setMarkmaps",
      payload: {
        ...markmaps,
        [uuid]: { ...markmaps[uuid], text: composedText },
      },
    });
  }, [debouncedComposedText]);

  useEffect(() => {
    if (refMm.current) return;
    const markMap = Markmap.create(refSvg.current, markmapOptions);
    refMm.current = markMap;
    renderToolbar(refMm.current, refToolbar.current);
  }, [refSvg.current, preview, markmapOptions]);

  useEffect(() => {
    const markMap = refMm.current;
    if (!markMap) return;
    const { root } = transformer.transform(text);
    markMap.setData(root);
    markMap.fit();
  }, [refMm.current, text]);

  useEffect(() => {
    if (markmaps[uuid].text === text) return;
    autosave && saveText(text);
    dispatch({
      type: "setMarkmaps",
      payload: {
        ...markmaps,
        [uuid]: { ...markmaps[uuid], text },
      },
    });
  }, [debouncedText]);

  useEffect(() => {
    setText(markmapText);
  }, [markmapText]);

  const handleChange = (e: any) => {
    setText(e.target.value);
  };

  return (
    <div
      ref={refVisualizer}
      className={`${styles.visualizer} ${preview ? styles.preview : ""} ${
        !showVisualizer && !preview ? styles.hide : ""
      }`}
    >
      {!preview && <h1>{title}</h1>}
      <svg
        className={styles.board}
        style={{
          color: preview ? "var(--main-color-950)" : "var(--main-color-950)",
        }}
        ref={refSvg}
      />
      {!preview && (
        <button
          className={`fa-solid fa-pencil ${styles.button} ${
            !hideDashboard && styles.hide
          }`}
          onClick={toggleHideDashboard}
        ></button>
      )}
      {!preview && (
        <MarkmapVisualizerEditor
          {...{
            autosave,
            toggleAutosave,
            preview,
            handleChange,
            text,
            hide: hideDashboard,
            toggleHide: toggleHideDashboard,
          }}
        ></MarkmapVisualizerEditor>
      )}
      <div className={`${styles.toolbar} ${preview ? styles.hidden : ""}`}>
        <div ref={refToolbar}></div>
      </div>
    </div>
  );
};
