import styles from "./styles.module.css";
import { INPUT_TYPES } from "../../../../components/DefineForms";
import { InputHelper } from "../../../../components/InputHelper";
import { beutifyLabel } from "../../../../utils";

export const SelectionInput = ({
  keyName,
  value,
  controlledValue,
  name,
  onChange,
  required = false,
}: {
  keyName: string;
  value: any;
  controlledValue: any;
  name: string;
  onChange: Function;
  required?: boolean;
}) => {
  return (
    <>
      {required && <InputHelper />}
      <select
        className={styles.selection}
        name={keyName}
        value={controlledValue}
        onChange={(e: any) => onChange(name, e.target, INPUT_TYPES.SELECTION)}
      >
        {value.map((item: any, index: any) => {
          return (
            <option className={styles.option} value={item} key={index}>
              {item}
            </option>
          );
        })}
      </select>
      <label className={styles.label}>{beutifyLabel(name)}</label>
    </>
  );
};
