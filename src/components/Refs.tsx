import { Children, cloneElement, useEffect } from "react";

const Ref = ({ children: child, $ref }: any) => {
  useEffect(() => {
    let whenGone: Function | null = null;
    if (child.props.use) whenGone = child.props.use($ref.current);
    return () => whenGone && whenGone();
  }, [$ref.current, child.props.id]);
  return (
    <div id={child.props.id} ref={$ref} autoFocus={true}>
      {cloneElement(child, {
        ...child.props,
      })}
    </div>
  );
};

export const Refs = ({ children, $refs }: any): any => {
  return Children.toArray(children).map((child: any, index: any) => {
    const $ref = { current: null };
    $refs.current[index] = $ref;
    return (
      <Ref key={index} {...{ $ref }}>
        {child}
      </Ref>
    );
  });
};
