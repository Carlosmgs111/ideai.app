import { INPUT_TYPES } from "../../../../components/DefineForms";

export const EitherInput = ({
  keyName,
  value,
  name,
  onChange,
}: {
  keyName: string;
  value: any;
  name: string;
  onChange: Function;
}) => {
  return (
    <>
      <label>
        false
        <input
          name={keyName}
          type="radio"
          disabled={true}
          value={"false"}
          checked={String(value) === "false"}
          onChange={(e:any) => onChange(name, e.target, INPUT_TYPES.EITHER)}
        />
      </label>
      <label>
        true
        <input
          name={keyName}
          type="radio"
          disabled={true}
          value={"true"}
          checked={String(value) === "true"}
          onChange={(e:any) => onChange(name, e.target, INPUT_TYPES.EITHER)}
        />
      </label>
    </>
  );
};
