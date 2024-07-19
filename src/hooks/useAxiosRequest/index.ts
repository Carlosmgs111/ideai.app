import config from "../../config";
import axios from "axios";

const methods = Object.freeze(["get", "post", "put", "patch", "delete"]);
const typedAxios: any = axios;
const API_URL = config.apiUrl;

export function useAxiosRequest({ setData, setLoading, setError }: any = {}) {
  const _fetch = async (method: any, ...args: any) => {
    let data = null;
    let error = null;
    let loading = true;
    // setError({ message: "ERROR" });

    setLoading && setLoading(true);
    args[0] = `${API_URL}/${args[0]}`;
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
