import { useReducer } from "react";

export const useReduceState = (initialState: any) => {
  const [state, dispatch]: any = useReducer((prevState: any, payload: any) => {
    const [key, value]: any = Object.entries(payload)[0];
    prevState = { ...prevState, [key]: value };
    return prevState;
  }, initialState);

  return [state, dispatch]
};
