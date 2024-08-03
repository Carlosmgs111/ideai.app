import { useState, useEffect, useCallback } from "react";
import { TrackSidebar as T } from "../../components/TrackSidebar";
import { cloneElement } from "react";
import { useNearScreenArray } from "../useNearScreen";
import { labelCases } from "../../utils";

export const useTrackSidebar = () => {
  const [indexesRefs, setIndexesRefs]: any = useState([]);
  const [indexes, setIndexes]: any = useState([]);
  const refreshRefs = (ref: any, show: boolean) => {
    if (show && !indexesRefs.includes(ref)) indexesRefs.push(ref);
    if (!show && indexesRefs.includes(ref))
      indexesRefs.splice(indexesRefs.indexOf(ref), 1);
    setIndexesRefs([...indexesRefs]);
  };
  const TrackSidebar = useCallback(
    (props: any) => {
      return (
        <T
          {...{
            ...props,
            items: indexes,
            refs: indexesRefs,
            id: "track-sidebar",
          }}
        />
      );
    },
    [indexes]
  );
  const ContentWrapper = useCallback(({ children }: any): any => {
    const [elementsRefs] = useNearScreenArray(children, refreshRefs);

    useEffect(() => {
      const childrenIndexes: any = [];
      children.forEach((child: any) => {
        const { id, title } = child.props;
        childrenIndexes.push({ reference: id, title });
      });
      setIndexes(childrenIndexes);
    }, [children.length]);

    return children.map((child: any, index: any): any => (
      <div
        key={index}
        ref={elementsRefs.current[index]}
        id={labelCases(child.props.id).LS}
      >
        {cloneElement(child, {})}
      </div>
    ));
  }, []);
  return { TrackSidebar, ContentWrapper };
};
