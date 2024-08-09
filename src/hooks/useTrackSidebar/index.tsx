import { useState, useEffect, useCallback, useRef } from "react";
import { TrackSidebar as WrappedTrackSidebar } from "../../components/TrackSidebar";
import { cloneElement, Children } from "react";
import { ComponentReferencer } from "../../components/ComponentReferencer";
import { labelCases } from "../../utils";

export const useTrackSidebar = () => {
  const [indexesRefs, setIndexesRefs]: any = useState({});
  const [indexes, setIndexes]: any = useState([]);
  const elementsIndexes = useRef([]);
  const refreshRefs = (ref: any, show: boolean) => {
    indexesRefs[ref] = show;
    setIndexesRefs({ ...indexesRefs });
  };

  const TrackSidebar = useCallback(
    (props: any) => {
      return (
        <WrappedTrackSidebar
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

  const ContentWrapper = useCallback(({ children, deps=[] }: any): any => {
    useEffect(() => {
      const childrenIndexes: any = [];
      children.forEach((child: any) => {
        const { id, title } = child.props;
        childrenIndexes.push({ reference: id, title });
      });
      setIndexes(childrenIndexes);
      setIndexesRefs(indexesRefs);
    }, [...deps]);

    return (
      <ComponentReferencer $refs={elementsIndexes}>
        {Children.toArray(children).map((child: any) =>
          cloneElement(child, {
            ...child.props,
            id: labelCases(child.props.id).LS,
            use: (current: any) => {
              if (!current) return;
              new window.IntersectionObserver(
                (entries) => {
                  const { isIntersecting }: any = entries[0];
                  refreshRefs(child.props.id, isIntersecting);
                },
                { threshold: 0.5 }
              ).observe(current);
            },
          })
        )}
      </ComponentReferencer>
    );
  }, []);
  return { TrackSidebar, ContentWrapper };
};
