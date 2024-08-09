import { Children, cloneElement, useEffect } from "react";

const ElementWrapper = ({ children, index, $refs }: any) => {
  const child = children;
  const ref = { current: null };
  $refs.current[index] = ref;
  useEffect(() => {
    if (child.props.use) child.props.use(ref.current);
  }, [ref.current]);
  return (
    <div id={child.props.idx} key={index} ref={ref} autoFocus={true}>
      {cloneElement(child, {
        ...child.props,
        key: index,
      })}
    </div>
  );
};

export const ComponentReferencer = ({ children, $refs }: any) => {
  return Children.toArray(children).map((child: any, index: any) => {
    return <ElementWrapper {...{ index, $refs }}>{child}</ElementWrapper>;
  });
};
