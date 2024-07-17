import { useEffect, useRef } from "react";
import { ELEMENT_EVENTS } from "../utils";

const deepinInChild = (element: Element, cb: Function) => {
  if (!element) return;
  cb(element);
  const firstChild = element.children[0];
  if (!firstChild) return;
  deepinInChild(firstChild, cb);
  return;
};

// TODO 🏗️ Optimize
export const useSmoothScroll = (
  { horizontal = false }: any,
  dependencies: Array<any> = []
) => {
  const parent: any = useRef(null);
  const anchors: any = useRef([]);
  const elements: any = useRef([]);
  useEffect(() => {
    if (!parent.current || !anchors.current[0] || !elements.current[0]) return;
    anchors.current.forEach((anchor: any) => {
      if (!anchor.current) return;
      const elementId = anchor.current.id;
      const currentElement = elements.current.find(
        (child: any) => child.current.id === elementId
      );
      if (horizontal)
        anchor.current.addEventListener(ELEMENT_EVENTS.CLICK, (e: any) => {
          parent.current.scrollTo({
            left: currentElement?.current?.offsetLeft,
            behavior: "smooth",
          });
        });
    });

    return () => {
      parent.current &&
        parent.current.removeEventListener(ELEMENT_EVENTS.SCROLL, () => {});
    };
  }, [...dependencies]);

  return { parent, anchors, elements };
};
