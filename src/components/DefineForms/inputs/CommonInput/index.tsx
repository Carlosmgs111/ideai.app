import { beutifyLabel } from "../../../../utils";
import styles from "./styles.module.css";
import { InputHelper } from "../../../../components/InputHelper";
import { INPUT_TYPES } from "../../../../components/DefineForms";
import { Memo } from "../../../../hocs/Memo";
import { useEffect, useState } from "react";

// ? This component can be used as an Individual component
// ? Also as a controlled component using InputForm component
export const CommonInput = ({
  keyName = "",
  value: _value = "",
  name = "",
  label = "",
  required = false,
  onChange = () => {},
}: {
  keyName?: string;
  value?: any;
  name?: string;
  label?: string;
  onChange?: Function;
  nonOptionals?: Array<string>;
  required?: boolean;
}) => {
  const [value, setValue] = useState(_value);
  useEffect(() => setValue(_value), [_value]);
  return (
    <Memo deps={[value]}>
      {required && <InputHelper />}
      <div>
        <input
          className={styles.common_input}
          type={typeof value === "string" ? "text" : "number"}
          name={keyName}
          value={value}
          onChange={(e: any) => {
            setValue(e.target.value);
            onChange &&
              onChange(
                name,
                e.target,
                typeof value === "string"
                  ? INPUT_TYPES.TEXT
                  : INPUT_TYPES.NUMBER
              );
          }}
          placeholder={beutifyLabel(label || name)}
        />
        <label className={styles.label}>{beutifyLabel(label || name)}</label>
      </div>
    </Memo>
  );
};
