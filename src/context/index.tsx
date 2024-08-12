import { createContext, useContext, Children, cloneElement } from "react";
import { useReduceState } from "../hooks/useReduceState";

export const StateContext: any = createContext(null);
export const StateProvider = ({ initialState, children }: any) => (
  <StateContext.Provider value={useReduceState(initialState)}>
    {children
      ? Children.toArray(children).map((child: any) =>
          cloneElement(child, { withcontext: "true" })
        )
      : null}
  </StateContext.Provider>
);
export const useStateValue = () => useContext(StateContext);
