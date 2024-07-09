import { useStateValue } from "../context";

export const headers = () => {
  const [{ token }]: any = useStateValue();
  return {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
};
