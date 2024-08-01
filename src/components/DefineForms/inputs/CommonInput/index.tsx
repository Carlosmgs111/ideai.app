import { beutifyLabel } from "../../../../utils";
import styles from "./styles.module.css";
import { InputHelper } from "../../../../components/InputHelper";
import { INPUT_TYPES } from "../../../../components/DefineForms";

// ? This component can be used as an Individual component
// ? Also as a controlled component using InputForm component
export const CommonInput = ({
  keyName = "",
  value = "",
  name = "",
  label = "",
  required = false,
  onChange = () => {},
  nonOptionals = [],
}: {
  keyName?: string;
  value?: any;
  name?: string;
  label?: string;
  onChange?: Function;
  nonOptionals?: Array<string>;
  required?: boolean;
}) => {
  return (
    <>
      {required && <InputHelper />}
      <input
        className={styles.common_input}
        type={typeof value === "string" ? "text" : "number"}
        name={keyName}
        value={value}
        onChange={(e: any) => {
          onChange &&
            onChange(
              name,
              e.target,
              typeof value === "string" ? INPUT_TYPES.TEXT : INPUT_TYPES.NUMBER
            );
        }}
        disabled={!nonOptionals.includes(name)}
        placeholder={beutifyLabel(label || name)}
      />
      <label className={styles.label}>{beutifyLabel(label || name)}</label>
    </>
  );
};
