import { useReducer } from "react";

export const useReduceState = (initialState: any, onUpdate: any = null) => {
  const [state, dispatch]: any = useReducer((prevState: any, payload: any) => {
    const [key, value]: any = Object.entries(payload)[0];
    onUpdate && onUpdate(key, value);
    prevState = { ...prevState, [key]: value };
    return prevState;
  }, initialState);

  return [state, dispatch];
};
