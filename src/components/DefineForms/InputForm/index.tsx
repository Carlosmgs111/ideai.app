import { beutifyLabel, Mapfy } from "../../../utils";
import { MemoizedComponent } from "../../../components/MemoizedComponent";
import {
  CommonInput,
  SelectionInput,
  RangeInput,
  MultiInput,
  EitherInput,
  DateInput,
  ParagraphInput,
} from "../inputs";
import { useEffect, useReducer } from "react";
import { useToggle } from "../../../hooks/useToggle";
import { INPUT_TYPES } from "..";
import styles from "./styles.module.css";

type InputFormOps = {
  index: any;
  schema: any;
  _data: any;
  updateSchemaDelta: Function;
  fixed?: Boolean;
  modifiable?: Boolean;
  column?: Boolean;
  nonOptionals?: Array<any>;
  onClick: Function;
};

export function InputForm({
  index,
  schema,
  _data,
  updateSchemaDelta,
  fixed = false,
  modifiable = true,
  column = true,
  nonOptionals = [],
  onClick,
}: InputFormOps) {
  const [isExpanded, _] = useToggle(true, false);
  // const [data, setData] = useState(_data);
  const [data, setData]: any = useReducer(
    (data: any, { index, payload }: any): any => {
      if (!payload) return {};
      if (payload && !index) return payload;
      return { ...data, [index]: payload };
    },
    _data
  );

  const updateData = (index: any, deltaData: any) => {
    setData({
      index,
      payload: { ...data[index], controlledValue: deltaData },
    });
  };

  useEffect(() => {
    updateSchemaDelta(index, { ...data });
    // console.log(`Index changed: ${index}`);
  }, [data]);

  const onChange = (currentName: any, target: any, inputType?: string) => {
    let { name, value } = target;
    if (inputType === INPUT_TYPES.DATE) value = new Date(value).getTime();
    if (inputType === INPUT_TYPES.EITHER) {
      value = value === "true" ? true : false;
    }
    if (inputType === INPUT_TYPES.NUMBER) value = Number(value);
    if (Array.isArray(inputType)) {
      if (
        inputType[0] === INPUT_TYPES.TEXT ||
        inputType[0] === INPUT_TYPES.PARAGRAPH ||
        inputType[0] === INPUT_TYPES.SELECTION
      ) {
        // console.log(inputType[0], { schema, index, currentName, target });
        const list = [...data[currentName].controlledValue];
        list[name] = value;
        value = [...list];
      }
      if (inputType[0] === INPUT_TYPES.DATE) {
        value = new Date(value).getTime();
        const list = [...data[currentName].controlledValue];
        list[name] = value;
        value = [...list];
      }
    }
    updateData(currentName, value);
  };

  const Form = (attribute: any, onChange: any, idx?: any) => {
    const [name, input] = attribute;
    const { inputType, label, value, controlledValue, ...rest } = input;
    const keyName = `${index}-${name}`;

    const FORMS: any = {
      [INPUT_TYPES.TEXT]: (
        <CommonInput
          {...{
            keyName,
            value: controlledValue,
            name,
            label,
            onChange,
            nonOptionals,
            ...rest,
          }}
        />
      ),
      [INPUT_TYPES.PARAGRAPH]: (
        <ParagraphInput
          {...{
            keyName,
            text: controlledValue,
            name,
            label,
            onChange,
            nonOptionals,
            ...rest,
          }}
        />
      ),
      [INPUT_TYPES.NUMBER]: (
        <CommonInput
          {...{
            keyName,
            value: controlledValue,
            name,
            label,
            onChange,
            nonOptionals,
            ...rest,
          }}
        />
      ),
      [INPUT_TYPES.DATE]: (
        <DateInput
          {...{
            idx,
            keyName,
            value: controlledValue,
            name,
            label,
            onChange,
            nonOptionals,
            ...rest,
          }}
        />
      ),
      [INPUT_TYPES.SELECTION]: (
        <SelectionInput
          {...{
            keyName,
            value,
            controlledValue,
            name,
            label,
            onChange,
            nonOptionals,
            ...rest,
          }}
        />
      ),
      [INPUT_TYPES.RANGE]: (
        <RangeInput
          {...{
            keyName,
            value,
            controlledValue,
            name,
            label,
            onChange,
            nonOptionals,
            ...rest,
          }}
        />
      ),
      [INPUT_TYPES.EITHER]: (
        <EitherInput
          {...{
            keyName,
            value,
            name,
            label,
            onChange,
            ...rest,
          }}
        />
      ),
    };

    return (
      <MemoizedComponent deps={[controlledValue]}>
        <div className={`${styles.form} ${isExpanded}`}>
          {(() => {
            if (Array.isArray(inputType)) {
              return (
                <MultiInput
                  {...{
                    name,
                    label,
                    onChange,
                    updateData,
                    updateSchemaDelta,
                    inputType: inputType[0],
                    nonOptionals,
                    controlledValue,
                    value,
                    keyName,
                    ...rest,
                  }}
                />
              );
            }
            return FORMS[inputType];
          })()}

          {nonOptionals.includes(name) ? (
            <label>{beutifyLabel(name)}</label>
          ) : (
            <label>
              <input
                style={{ width: "fit-content", visibility: "hidden" }}
                className={name}
                onClick={(e: any) => {
                  Array(document.getElementsByName(keyName)[0]).forEach(
                    (input: any) => {
                      if (!e.target.checked) {
                        delete data[input.name.replace(`${index}-`, "")];
                        // setSchema({ ...schema });
                      } else {
                        // setSchema({
                        //   ...schema,
                        //   [index]: {
                        //     ...schema[index],
                        //     [name]:
                        //       input.type === "number"
                        //         ? Number(input.value)
                        //         : input.type === "radio"
                        //         ? input.checked
                        //           ? input.value === "true"
                        //             ? true
                        //             : false
                        //           : true
                        //         : input.value,
                        //   },
                        // });
                      }
                    }
                  );
                }}
                type="checkbox"
                id={keyName}
                onChange={() => {
                  document.getElementsByName(keyName).forEach((input: any) => {
                    input.disabled = !input.disabled;
                  });
                }}
              />
              {beutifyLabel(name)}
            </label>
          )}
        </div>
      </MemoizedComponent>
    );
  };

  return (
    <ul className={`${styles.list} ${column && styles.column}`}>
      {Object.entries(data).map((attribute, index) => {
        if (index < nonOptionals.length + 1)
          return <li key={index}> {Form(attribute, onChange)}</li>;
        return (
          <MemoizedComponent deps={[Mapfy(data).size]}>
            <li
              style={{ width: "100%" }}
              key={index}
              hidden={
                isExpanded && index > nonOptionals.length + 1 ? true : false
              }
            >
              {Form(attribute, onChange, index)}
            </li>
          </MemoizedComponent>
        );
      })}
      {modifiable && (
        <button
          className={`fa-solid fa-plus ${styles.main} ${styles.add_button}`}
          type="button"
          name="add"
          id={index}
          onClick={(e: any) => onClick(e)}
        />
      )}
      {Object.entries(schema).length > 1 && !fixed && modifiable ? (
        <button
          className={`fa-solid fa-trash ${styles.main} ${styles.delete_button}`}
          type="button"
          name="remove"
          id={index}
          onClick={(e: any) => onClick(e)}
        />
      ) : null}
      {/* {Object.entries(schema[index]).length > 2 ? (
        <ExpandButton
          type="button"
          className={`fas fa-chevron-${isExpanded ? "down" : "up"} p-2 item`}
          onClick={switchIsExpanded}
        />
      ) : null} */}
    </ul>
  );
}
