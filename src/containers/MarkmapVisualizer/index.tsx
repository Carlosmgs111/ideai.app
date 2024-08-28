import "markmap-toolbar/dist/style.css";
import { useRef, useEffect, useReducer, useState } from "react";
import { useDebounce } from "../../hooks/useDebounce";
import { Markmap, deriveOptions, loadCSS, loadJS } from "markmap-view";
import { Toolbar } from "markmap-toolbar";
// import { loadCSS, loadJS } from "markmap-common";
import { Transformer } from "markmap-lib";
import styles from "./styles.module.css";
import { useStateValue } from "../../context";
import { SocketService, URL_API } from "../../services";
import { useNearScreen } from "../../hooks/useNearScreen";
import { MarkmapEditor } from "../MarkmapEditor";
import { MarkmapChat } from "../MarkmapChat";
import { useToggle } from "../../hooks/useToggle";
import { Memo } from "../../hocs/Memo";
import colors from "../../db/colors.json";
import { shuffleArray } from "../../utils";
import { Modal } from "../../components/Modal";

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
    toolbar.setBrand(false);
    // toolbar.setItems([...Toolbar.defaultItems, "alert"]);
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
  const [{ markmaps, theme }, dispatch]: any = useStateValue();
  const [text, setText]: any = useState(markmapText);
  const debouncedText = useDebounce(text, 500);
  const [autosave, toggleAutosave] = useToggle(_autosave, !_autosave);
  const [markmapEditor, toggleMarkmapEditor] = useToggle(false, true);
  const [assistantChat, toggleAssistantChat] = useToggle(false, true);
  const [refVisualizer, showVisualizer] = useNearScreen(false);
  const refSvg = useRef<any>();
  const refMm = useRef<any>();
  const refToolbar = useRef<any>();
  const [composedText, composedTextDispatch]: any = useReducer(
    (prevText: any, text: any) => (prevText += text),
    markmapText
  );
  const debouncedComposedText = useDebounce(composedText, 100);
  const markmapOptions = deriveOptions({
    maxWidth: preview ? 260 : 800,
    initialExpandLevel: preview ? 2 : 3,
    colorFreezeLevel: 3,
    duration: 400,
    color: shuffleArray(colors["neon.v1"].map(({ hex }) => hex)),
  });
  const saveText = (text: any) => {
    fetch(`${URL_API}/markmap/update`, {
      method: "PATCH",
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
          const { text: chunk, title: receivedTitle } = updatedMarkmap;
          composedTextDispatch(chunk);
          if (title) return;
          dispatch({
            markmaps: {
              ...markmaps,
              [uuid]: { ...markmaps[uuid], title: receivedTitle },
            },
          });
        },
      },
    });
    // ? Useful in collaborative environments
    SocketService.receiveMessage({
      core: {
        [`updateMarkmap$${uuid}`]: async (updatedMarkmap: any) => {
          dispatch({
            markmaps: {
              ...markmaps,
              [uuid]: { ...markmaps[uuid], ...updatedMarkmap },
            },
          });
        },
      },
    });
  }, []);

  useEffect(() => {
    setText(composedText);
    if (markmapText === composedText) return;
    dispatch({
      markmaps: {
        ...markmaps,
        [uuid]: { ...markmaps[uuid], text: composedText },
      },
    });
  }, [debouncedComposedText]);

  useEffect(() => {
    if (refMm.current) return;
    // refSvg.current.style.color = "black";
    // refSvg.current.style.fontSize
    const markMap = Markmap.create(refSvg.current, markmapOptions);
    refMm.current = markMap;
    renderToolbar(refMm.current, refToolbar.current);
  }, [refSvg.current, preview, markmapOptions]);

  useEffect(() => {
    const markMap = refMm.current;
    if (!showVisualizer) return;
    if (!markMap) return;
    const { root } = transformer.transform(text);
    markMap.setData(root);
    markMap.fit();
  }, [refMm.current, text, showVisualizer]);

  useEffect(() => {
    if (markmapText === text) return;
    !preview && autosave && saveText(text);
    dispatch({
      markmaps: {
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

  const textColor: any = {
    light: "var(--main-color-950)",
    dark: "var(--main-color-50)",
  };

  return (
    <Memo deps={[text, title, showVisualizer, theme, toggleMarkmapEditor]}>
      <div
        ref={refVisualizer}
        className={`${styles.visualizer} ${styles[theme]} ${
          preview ? styles.preview : ""
        } ${!showVisualizer && !preview ? styles.hide : ""}`}
      >
        {!preview || (!title && <h1>{title}</h1>)}
        <svg
          className={styles.board}
          style={{
            color: textColor[theme],
          }}
          ref={refSvg}
        />
        {!preview && (
          <div className={styles.quickboard}>
            <div className={styles.option}>
              <button
                className={`fa-solid fa-robot ${styles.button}`}
                onClick={toggleAssistantChat}
              ></button>
              <span>Chatear con AI&bull;sistente</span>
            </div>
            <div className={styles.option}>
              <button
                className={`fa-solid fa-pencil ${styles.button}`}
                onClick={toggleMarkmapEditor}
              ></button>
              <span>Editar Mindmap</span>
            </div>
          </div>
        )}

        <div className={`${styles.toolbar} ${preview ? styles.hidden : ""}`}>
          <div ref={refToolbar}></div>
        </div>
      </div>
      <Modal
        active={markmapEditor}
        onClick={toggleMarkmapEditor}
        theme={theme}
        from="left"
      >
        <MarkmapEditor
          {...{
            autosave,
            toggleAutosave,
            handleChange,
            text,
          }}
        />
      </Modal>
      <Modal
        active={assistantChat}
        onClick={toggleAssistantChat}
        theme={theme}
        from="left"
      >
        <MarkmapChat />
      </Modal>
    </Memo>
  );
};
