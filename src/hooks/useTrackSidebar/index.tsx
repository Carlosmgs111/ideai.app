import { useState, useCallback, useRef, useEffect } from "react";
import { TrackSidebar as WrappedTrackSidebar } from "../../components/TrackSidebar";
import { cloneElement, Children } from "react";
import { ComponentReferencer } from "../../components/ComponentReferencer";
import { MemoizedComponent } from "../../components/MemoizedComponent";
import { mapToList } from "../../utils";

const ElementWrapped = ({
  children: child,
  indexes,
  index,
  setIndexes,
}: any) => {
  const { id, title } = child.props;
  useEffect(() => {
    indexes[index] = {
      reference: id,
      title,
      isVisible: indexes[index]?.isVisible,
    };
    setIndexes({ ...indexes });
  }, [id, title]);

  return (
    <MemoizedComponent deps={[child.props]}>
      <div id={id}>
        {cloneElement(child, {
          ...child.props,
        })}
      </div>
    </MemoizedComponent>
  );
};

export const useTrackSidebar = () => {
  const [indexes, setIndexes]: any = useState({});
  const elementsIndexes = useRef([]);
  const TrackSidebar = useCallback((props: any) => {
    return (
      <WrappedTrackSidebar
        {...{
          ...props,
          items: indexes,
        }}
      />
    );
  }, []);

  const ContentWrapper = useCallback(({ children }: any): any => {
    useEffect(() => {
      mapToList(indexes).forEach((_: any, index: any) => {
        if (index > children.length - 1) delete indexes[index];
      });
    }, [children.length]);
    return (
      <ComponentReferencer $refs={elementsIndexes}>
        {Children.toArray(children).map((child: any, index) => (
          <ElementWrapped
            key={index}
            {...{
              indexes,
              setIndexes,
              index,
              use: (current: any) => {
                if (!current) return;
                const observer: any = new window.IntersectionObserver(
                  (entries) => {
                    const { isIntersecting }: any = entries[0];
                    indexes[index] = {
                      ...indexes[index],
                      isVisible: isIntersecting,
                    };
                    setIndexes({ ...indexes });
                  },
                  { threshold: 0.5 }
                ).observe(current);
                return () => {
                  observer?.disconnect();
                };
              },
            }}
          >
            {child}
          </ElementWrapped>
        ))}
      </ComponentReferencer>
    );
  }, []);
  return { TrackSidebar, ContentWrapper };
};
