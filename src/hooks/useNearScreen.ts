import { useState, useEffect, useRef } from "react";

typeof window.IntersectionObserver !== "undefined"
  ? window.IntersectionObserver
  : import("intersection-observer");

export const useNearScreen = (
  initialState: any = null,
  cb: Function | null = null,
  opts: any = {}
) => {
  const { threshold = 0.5 } = opts;
  const _ref = null; // ? For some weird reason, when a high order element or component parent of component
  // ? implementing this hook, is referenced with `ref` attribute and passing directly
  // ? ↙️ `null` to useRef to references the given element, the reference is missed, so to
  // ? ⬇️ avoid it, must be passed a variable with the initial value, in this case ↖️`_ref`
  const ref: any = useRef(_ref);
  const [show, setShow] = useState(initialState);
  useEffect(() => {
    var observer: any;
    const setObserver = (current: any) => {
      observer = new window.IntersectionObserver(
        (entries) => {
          const { isIntersecting }: any = entries[0];
          setShow(isIntersecting);
          if (cb) cb(current.id, isIntersecting);
        },
        { threshold }
      );
      if (current instanceof Element) observer.observe(current);
    };
    setObserver(ref.current);
    return () => observer?.disconnect();
  }, [ref]);
  return [ref, show];
};
