import { useEffect, useRef } from "react";

// ? aparently this is a good implementation but must
// ? be implementated a timing control mechanism
export const useResizeHTMLElement = <LegacyRef>(
  callback: Function,
  deps: Array<any> = []
) => {
  const ref = useRef(null);
  let prevWidth: any, prevHeight: any;
  const resizeObserver = new ResizeObserver(async (entries) => {
    const { width, height } = entries[0].contentRect;
    if (prevHeight !== height || prevWidth !== width) callback();
    prevHeight = height;
    prevWidth = width;
  });

  useEffect(() => {
    if (ref.current) resizeObserver.observe(ref.current);
  }, Array([ref], deps));

  return ref;
};
