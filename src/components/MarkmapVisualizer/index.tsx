import "markmap-toolbar/dist/style.css";
import React, { useState, useRef, useEffect } from "react";
import { Markmap } from "markmap-view";
import { Toolbar } from "markmap-toolbar";
import { loadCSS, loadJS } from "markmap-common";
import { Transformer } from "markmap-lib";
import styles from "./styles.module.css";

const transformer = new Transformer();
const { scripts, styles: TStyles }: any = transformer.getAssets();
loadCSS(TStyles);
loadJS(scripts);

const initValue = `# markmap
- beautiful
- useful
- easy
- interactive
`;

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

export const MarkmapVisualizer = () => {
  const [value, setValue] = useState(initValue);
  const refSvg = useRef<any>();
  const refMm = useRef<any>();
  const refToolbar = useRef<any>();

  useEffect(() => {
    if (refMm.current) return;
    const markMap = Markmap.create(refSvg.current);
    console.log("create", refSvg.current);
    refMm.current = markMap;
    renderToolbar(refMm.current, refToolbar.current);
  }, [refSvg.current]);

  useEffect(() => {
    const markMap = refMm.current;
    if (!markMap) return;
    const { root } = transformer.transform(value);
    markMap.setData(root);
    markMap.fit();
  }, [refMm.current, value]);

  const handleChange = (e: any) => {
    setValue(e.target.value);
  };

  return (
    <div className={styles.visualizer}>
      <div className={styles.editor}>
        <textarea className="" value={value} onChange={handleChange} />
      </div>
      <svg className={styles.board} ref={refSvg} />
      <div className={styles.toolbar} ref={refToolbar}></div>
    </div>
  );
};
