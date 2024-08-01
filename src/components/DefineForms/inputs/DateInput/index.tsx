import { beutifyLabel } from "../../../../utils";
import styles from "./styles.module.css";
import { InputHelper } from "../../../../components/InputHelper";
import { INPUT_TYPES } from "../../../../components/DefineForms";

export const DateInput = ({
  idx,
  keyName,
  value,
  name,
  onChange,
  nonOptionals,
  required = false,
}: {
  idx: any;
  keyName: string;
  value: any;
  name: string;
  onChange: any;
  nonOptionals: Array<string>;
  required?: boolean;
}) => {
  return (
    <>
      {required && <InputHelper />}
      <input
        className={styles.date_input}
        type="date"
        key={keyName}
        name={idx}
        value={new Date(value).toISOString().slice(0, 10)}
        onChange={(e: any) => {
          onChange(name, e.target, INPUT_TYPES.DATE);
        }}
        disabled={!nonOptionals.includes(name)}
        placeholder={beutifyLabel(name)}
      />
      <label className={styles.label}>{beutifyLabel(name)}</label>
    </>
  );
};
