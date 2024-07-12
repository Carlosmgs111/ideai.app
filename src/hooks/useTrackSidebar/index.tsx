import { useState, useMemo, useEffect } from "react";
import { TrackSidebar as T } from "../../components/TrackSidebar";
import { cloneElement, Children } from "react";
import { useNearScreenArray } from "../useNearScreen";
import { labelCases } from "../../utils";

export const useTrackSidebar = () => {
  const [refs, setRefs]: any = useState([]);
  const [indexes, setIndexes]: any = useState([]);
  const refreshRefs = (ref: any, show: boolean) => {
    if (show && !refs.includes(ref)) refs.push(ref);
    if (!show && refs.includes(ref)) refs.splice(refs.indexOf(ref), 1);
    setRefs([...refs]);
  };
  const TrackSidebar = useMemo(
    () => (props: any) =>
      T({
        ...props,
        items: indexes,
        refs,
        id: "track-sidebar",
      }),
    [indexes]
  );
  const ContentWrapper = useMemo(
    () =>
      ({ children }: any): any => {
        const _children = Children.toArray(children);
        const [_refs] = useNearScreenArray(
          _children.map(() => false),
          refreshRefs
        );
        const _childrenIds = _children.map((child: any) => child.props.id);
        useEffect(() => {
          setIndexes(_childrenIds);
        }, [_childrenIds.length]);
        return _children.map((child: any, index: any): any => {
          return (
            <div
              key={index}
              ref={_refs.current[index]}
              id={labelCases(child.props.id).LS}
            >
              {cloneElement(child, {})}
            </div>
          );
        });
      },
    []
  );
  return { TrackSidebar, ContentWrapper };
};
