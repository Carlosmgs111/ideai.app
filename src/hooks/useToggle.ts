import { stringify } from "flatted";
import { useState } from "react";

export function useToggle(valueA: any, valueB: any) {
  const [state, setState] = useState(valueA);
  var [_state, _valueA] = [state, valueA];
  if (typeof state === "object") {
    _state = stringify(state);
    _valueA = stringify(valueA);
  }
  const shift = () => setState(_state === _valueA ? valueB : valueA);
  return [state, shift];
}
