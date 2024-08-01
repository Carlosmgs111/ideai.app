import { beutifyLabel } from "../../../../utils";
import { INPUT_TYPES } from "../../../../components/DefineForms";
import { useEffect } from "react";
import { useToggle } from "../../../../hooks/useToggle";
import styles from "./styles.module.css";
import { InputHelper } from "../../../../components/InputHelper";

export const RangeInput = ({
  value,
  controlledValue,
  initValue = null,
  name,
  onChange,
  nonOptionals,
  required = false,
}: {
  keyName: string;
  value: any;
  controlledValue: any;
  initValue?: number | null;
  name: string;
  onChange: Function;
  nonOptionals: Array<string>;
  required?: boolean;
}) => {
  const [min, max, step] = value;
  const [initialValue, switchInitialValue] = useToggle(initValue, null);

  useEffect(() => {
    const rangeElement: HTMLElement | null = document.getElementById(name);
    if (rangeElement) {
      rangeElement.addEventListener("touchstart", () => {
        rangeElement.classList.add("active");
      });

      rangeElement.addEventListener("touchend", () => {
        rangeElement.classList.remove("active");
      });
    }
  }, []);

  useEffect(() => {}, []);
  return (
    <>
      {required && <InputHelper />}
      <input
        className={styles.range}
        type="range"
        id={name}
        min={min}
        max={max}
        name={name}
        defaultValue={initialValue || controlledValue}
        onChange={(e: any) => {
          if (initialValue) switchInitialValue();
          onChange(name, e.target, INPUT_TYPES.RANGE);
        }}
        disabled={!nonOptionals.includes(name)}
        placeholder={beutifyLabel(name)}
        step={step}
      ></input>
      <label className={styles.label}>
        {beutifyLabel(name)} : {initialValue || controlledValue}
      </label>
    </>
  );
};
