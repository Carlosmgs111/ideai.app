import { Children, cloneElement } from "react";

export const ComponentReferencer = ({ children }: any) => {
  let $refs: any;
  return Children.toArray(children).map((child: any, index: any) => {
    if(!child.props.$refs)return
    if (!$refs) $refs = child.props.$refs;
    const ref = { current: null };
    $refs.current[index] = ref;
    return (
      <div
        id={child.props.idx}
        ref={ref}
      >
        {cloneElement(child, {
          ...child.props,
          
        })}
      </div>
    );
  });
};