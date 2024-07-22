import { useEffect, useRef, useState } from "react";
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
export const useNavScroll = (
  { horizontal = false }: any,
  dependencies: Array<any> = []
) => {
  const container: any = useRef(null);
  const navIndexes: any = useRef([]);
  const elements: any = useRef([]);
  const [currentId, setCurrentId] = useState(0);
  const navNext = () => {
    if (!elements.current.length) return;
    if (currentId === elements.current.length - 1) return setCurrentId(0);
    setCurrentId(currentId + 1);
  };
  const navPrev = () => {
    if (!elements.current.length) return;
    if (currentId === 0) return setCurrentId(elements.current.length - 1);
    setCurrentId(currentId - 1);
  };
  useEffect(() => {
    if (!container.current || !navIndexes.current[0] || !elements.current[0]) return;
    container.current.scrollTo({
      left: elements.current[currentId].current.offsetLeft,
      behavior: "smooth",
    });
  }, [container.current, currentId]);

  useEffect(() => {
    if (!container.current || !navIndexes.current[0] || !elements.current[0]) return;
    navIndexes.current.forEach((anchor: any) => {
      if (!anchor.current) return;
      const elementId = anchor.current.id;
      const currentElement = elements.current.find(
        (child: any) => child.current.id === elementId
      );
      if (horizontal)
        anchor.current.addEventListener(ELEMENT_EVENTS.CLICK, () => {
          if (!currentElement.current) return;
          setCurrentId(Number(currentElement.current.id));
          container.current.scrollTo({
            left: currentElement.current.offsetLeft,
            behavior: "smooth",
          });
        });
    });

    return () => {
      container.current &&
        container.current.removeEventListener(ELEMENT_EVENTS.SCROLL, () => {});
    };
  }, [...dependencies, currentId]);

  return { container, navIndexes, elements, navPrev, navNext };
};
