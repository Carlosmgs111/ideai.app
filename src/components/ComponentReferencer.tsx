import { Children, cloneElement, useEffect } from "react";
import { Children, cloneElement, useEffect } from "react";

const ElementWrapper = ({ children: child, index, $refs }: any) => {
  const ref = { current: null };
  $refs.current[index] = ref;
  useEffect(() => {
    if (child.props.use) child.props.use(ref.current);
  }, [ref.current]);
  return (
    <div id={child.props.id} key={index} ref={ref} autoFocus={true}>
      {cloneElement(child, {
        ...child.props,
      })}
    </div>
  );
};

export const ComponentReferencer = ({ children, $refs }: any) => {
  return Children.toArray(children).map((child: any, index: any) => {
    return <ElementWrapper {...{ index, $refs }}>{child}</ElementWrapper>;
  });
};
