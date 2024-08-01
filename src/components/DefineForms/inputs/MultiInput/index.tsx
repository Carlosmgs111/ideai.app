import { InputHelper } from "../../../../components/InputHelper";
import { ParagraphInput } from "../ParagraphInput";
import { DateInput } from "../DateInput";
import { SelectionInput } from "../SelectionInput";
import styles from "./styles.module.css";
import inputFormsStyles from "../../InputForm/styles.module.css";
import {
  Mapfy,
  beutifyLabel,
  labelCases,
  listToMap,
  mapToList,
} from "../../../../utils";
import { INPUT_TYPES } from "../../../../components/DefineForms";
import { MemoizedComponent } from "../../../../components/MemoizedComponent";
import { useReducer, useEffect } from "react";

const ACTIONS = Object.freeze({ ADD: "ADD", REMOVE: "REMOVE" });

// TODO Check if is necessary use reducer to manage state of current provided state

export const MultiInput = ({
  name,
  onChange,
  updateData,
  inputType,
  nonOptionals,
  controlledValue,
  value,
  keyName,
  required = false,
}: {
  name: string;
  onChange: Function;
  data: any;
  updateData: Function;
  inputType: INPUT_TYPES;
  nonOptionals: Array<string>;
  controlledValue: any;
  value: any;
  keyName: string;
  required?: boolean;
}) => {
  const [inputValue, setInputValue] = useReducer(
    (state: any, { action, index, payload }: any) => {
      if (index >= 0 && !action) return { ...state, [index]: payload };
      if (index >= 0 && action === ACTIONS.ADD) {
        const listData = [...mapToList(state)];
        listData.splice(index + 1, 0, payload);
        return { ...listToMap(listData) };
      }
      if (index >= 0 && action === ACTIONS.REMOVE) {
        const listData = [...mapToList(state)];
        listData.splice(index, 1);
        return { ...listToMap(listData) };
      }
      return state;
    },
    listToMap(controlledValue)
  );
  useEffect(() => {
    updateData(name, [...mapToList(inputValue)]);
  }, [inputValue]);
  const updateInputValue = (index: any, state: any) =>
    setInputValue({ index, payload: state });
  const inputs: any = {};
  mapToList(inputValue).forEach((contentValue: any, index: any) => {
    inputs[index] = (
      <MemoizedComponent
        {...{
          key: index,
          deps: [contentValue],
        }}
      >
        <div className={styles.input_container}>
          {inputType === INPUT_TYPES.PARAGRAPH ? (
            <ParagraphInput
              {...{
                idx: index,
                text: contentValue,
                onChange: (name: string, target: any, inputType: string) => {
                  updateInputValue(index, target.value);
                  onChange(name, target, [inputType]);
                },
                placeholder: beutifyLabel(labelCases(name).CS),
                name,
                showLabel: false,
              }}
            />
          ) : null}
          {inputType === INPUT_TYPES.DATE ? (
            <DateInput
              {...{
                idx: index,
                keyName,
                value: contentValue,
                name,
                onChange: (name: string, target: any, inputType: string) => {
                  updateInputValue(index, new Date(target.value).getTime());
                  onChange(name, target, [inputType]);
                },
                nonOptionals,
              }}
            />
          ) : null}
          {inputType === INPUT_TYPES.SELECTION ? (
            <SelectionInput
              {...{
                idx: index,
                keyName,
                value: value[0],
                controlledValue: contentValue,
                name,
                onChange: (name: string, target: any, inputType: string) => {
                  updateInputValue(index, target.value);
                  onChange(name, target, [inputType]);
                },
              }}
            />
          ) : null}
          <div
            className={`${inputFormsStyles.button_section} ${styles.button_container}`}
          >
            <button
              className={`fa-solid fa-trash mini ${inputFormsStyles.delete_button}`}
              type="button"
              onClick={(e: any) => {
                e.preventDefault();
                setInputValue({ index, action: ACTIONS.REMOVE });
              }}
            />
            <button
              className={`fa-solid fa-plus mini ${inputFormsStyles.add_button}`}
              type="button"
              onClick={(e: any) => {
                e.preventDefault();
                let payload: any = "";
                if (inputType === INPUT_TYPES.DATE)
                  payload = new Date().getTime();
                if (inputType === INPUT_TYPES.SELECTION) payload = value[0][0];
                setInputValue({
                  index,
                  action: ACTIONS.ADD,
                  payload,
                });
              }}
            />
          </div>
        </div>
      </MemoizedComponent>
    );
  });
  return (
    <>
      {required && <InputHelper />}
      <div className={styles.multiinput}>
        {mapToList(inputs)}
        <label className={styles.label}>{beutifyLabel(name)}</label>
        {Mapfy(inputs).size === 0 && (
          <button
            className={`fa-solid fa-plus mini ${inputFormsStyles.add_button}`}
            style={{ width: "100%" }}
            type="button"
            onClick={(e: any) => {
              e.preventDefault();
              let payload: any = "";
              if (inputType === INPUT_TYPES.DATE)
                payload = new Date().getTime();
              if (inputType === INPUT_TYPES.SELECTION)
                payload = controlledValue[0];
              setInputValue({
                index: 0,
                action: ACTIONS.ADD,
                payload,
              });
            }}
          />
        )}
      </div>
    </>
  );
};
