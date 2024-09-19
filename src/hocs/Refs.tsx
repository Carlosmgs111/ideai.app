import { Children, cloneElement, useEffect, useRef } from "react";

const Ref = ({ children: child, $ref }: any) => {
  const { $useCurrent, ...props } = child.props;
  useEffect(() => {
    let cleanup: Function | null = null;
    if ($useCurrent) {
      if (!$ref.current) return;
      cleanup = $useCurrent($ref.current);
    }
    return () => {
      if (cleanup) cleanup();
    };
  }, [$ref.current, props.id]);
  return (
    <div id={props.id} ref={$ref} autoFocus={true}>
      {cloneElement(child, {
        ...props,
      })}
    </div>
  );
};

/**
 * ? Each element passed as `children` may recieve an argument named `$useCurrent`,
 * ? this is a function that in turn receives a reference of the current element,
 * ? useful for access and modify its behaviors and appearances.
 * */

export const Refs = ({
  children,
  $refs = undefined,
}: {
  children: any;
  $refs?: undefined | { current: any };
}): any => {
  const nativeRefs = useRef([]);
  const refs = $refs || nativeRefs;
  return Children.toArray(children).map((child: any, index: any) => {
    const $ref = { current: null };
    refs.current[index] = $ref;
    return (
      <Ref key={index} {...{ $ref }}>
        {child}
      </Ref>
    );
  });
};
