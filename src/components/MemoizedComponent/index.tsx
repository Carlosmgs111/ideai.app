import { Children, cloneElement, useMemo } from "react";

export const MemoizedComponent = ({ children, deps = [] }: any): any => {
  return useMemo(
    () =>
      Children.toArray(children).map((child: any) =>
        cloneElement(child, { ...child.props })
      ),
    [...deps]
  );
};
