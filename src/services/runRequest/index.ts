import { URL_API } from "..";
import axios from "axios";

const methods = Object.freeze(["get", "post", "put", "patch", "delete"]);
const typedAxios: any = axios;

export function runRequest({ setData, setLoading, setError }: any = {}) {
  const _fetch = async (method: any, ...args: any) => {
    let data = null;
    let error = null;
    let loading = true;
    // setError({ message: "ERROR" });

    setLoading && setLoading(true);
    args[0] = `${URL_API}/${args[0]}`;
    try {
      data = (await method(...args)).data;
    } catch (e) {
      error = e;
      setError && setError(error);
    } finally {
      setLoading && setLoading(false);
    }

    setData && !error && setData(data);
    loading = false;

    return [data, loading, error];
  };

  return Object.fromEntries(
    methods.map((method) => [
      method,
      (...args: any) => _fetch(typedAxios[method], ...args),
    ])
  );
}
