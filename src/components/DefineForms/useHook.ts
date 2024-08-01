import { useState, useEffect, useReducer } from "react";
import { runButtonBehavior, genRandomId, Mapfy } from "../../utils";
import { INPUT_TYPES } from ".";

export function useHook({ baseSchema = {}, onClickHandler }: any): any {
  const [label, setLabel] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [schema, setSchema]: any = useReducer(
    (schema: any, { index, payload }: any): any => {
      if (!payload) return {};
      if (payload && !index) return payload;
      return { ...schema, [index]: payload };
    },
    {}
  );
  const listOfDefineAttributes: any = [];

  const updateSchemaDelta = (index: any, deltaData: any) => {
    setSchema({ index, payload: deltaData });
  };

  const inferInputType = (name: any, attr: any) => {
    const schemaValue: {
      value: any;
      controlledValue: any;
      inputType: string | Array<any> | null;
      name: string;
    } = {
      controlledValue: null,
      value: null,
      inputType: null,
      name,
    };

    schemaValue.controlledValue = attr;
    schemaValue.value = attr;

    if (typeof attr === "string") schemaValue.inputType = INPUT_TYPES.TEXT;
    if (typeof attr === "number") schemaValue.inputType = INPUT_TYPES.NUMBER;
    if (
      Array.isArray(attr) &&
      attr.length === 2 &&
      String(attr[0]).length < 10 &&
      Boolean(Number(attr[0]) && !schemaValue.inputType)
    ) {
      schemaValue.inputType = INPUT_TYPES.RANGE;
    }
    if (
      Array.isArray(attr) &&
      Boolean(Number(attr[0])) &&
      String(attr[0]).length >= 10 &&
      !schemaValue.inputType
    )
      schemaValue.inputType = [INPUT_TYPES.DATE];
    if (Array.isArray(attr) && !schemaValue.inputType)
      schemaValue.inputType = [INPUT_TYPES.PARAGRAPH];

    return schemaValue;
  };

  const injectControlledValue = () => {
    Object.entries(baseSchema).forEach((inputSchema: Array<any>) => {
      let { controlledValue }: any = inputSchema[1];
      if (controlledValue) return;
      if (!inputSchema[1].inputType) {
        baseSchema[inputSchema[0]] = inferInputType(
          inputSchema[0],
          inputSchema[1]
        );
        return;
      } else {
        if (inputSchema[1].inputType === INPUT_TYPES.RANGE) {
          controlledValue = inputSchema[1].value[0];
        } else if (inputSchema[1].inputType === INPUT_TYPES.SELECTION) {
          controlledValue = inputSchema[1].value[0];
        } else if (
          Array.isArray(inputSchema[1].inputType) &&
          inputSchema[1].inputType[0] === INPUT_TYPES.SELECTION
        ) {
          controlledValue = [inputSchema[1].value[0][0]];
        } else {
          controlledValue = inputSchema[1].value;
        }
      }

      baseSchema[inputSchema[0]] = {
        ...inputSchema[1],
        controlledValue,
      };
    });
  };

  useEffect(() => {
    injectControlledValue();
    setSchema({ index: genRandomId(), payload: baseSchema });
    return () => reset();
  }, []);

  const parseSchema = (): Array<Object> => {
    const parsedSchema: any = [];
    let index = 0;

    Mapfy(schema).forEach((attr: any) => {
      parsedSchema.push({});
      Mapfy(attr).forEach((value: any, name: any) => {
        parsedSchema[index][name] = value.controlledValue;
      });
      index += 1;
    });

    return parsedSchema;
  };

  const reset = () => {
    setSchema({});
    setSchema({ index: genRandomId(), payload: baseSchema });
    setError(false);
    setLoading(false);
  };

  if (onClickHandler()) {
    onClickHandler = onClickHandler({
      setError,
      setLoading,
      data: parseSchema(),
      reset,
    });
    
  }

  const addDefineAttribute = (e: any) => {
    injectControlledValue();
    const listSchema = Object.entries(schema);
    const currentIndex = listSchema.findIndex((s) => s[0] === e.target.id);
    listSchema.splice(currentIndex + 1, 0, [String(genRandomId()), baseSchema]);
    setSchema({
      payload: {
        ...Object.fromEntries(listSchema),
      },
    });
  };

  const removeDefineAttribute = (e: any) => {
    delete schema[e.target.id];
    setSchema({ payload: { ...schema } });
  };

  const onClick = (e: any) => {
    e.preventDefault();
    const behaviors = {
      add: addDefineAttribute,
      remove: removeDefineAttribute,
      main: () =>
        onClickHandler({
          setError,
          setLoading,
          data: parseSchema(),
          reset,
        }),
    };
    runButtonBehavior(e, behaviors);
  };

  return {
    schema,
    updateSchemaDelta,
    onClick,
    listOfDefineAttributes,
    label,
    setLabel,
    loading,
    error,
    reset,
  };
}
