import config from "../config";
import { SocketService as SS } from "./SocketService";

export const URL_API = config.devUrl || config.prodUrl;
// export const URL_API =
//   config.devUrlApi || `${config.prodUrl}/api/${config.prodApiVersion}`;
// export const WS_URL = config.devWsUrl || config.prodWsUrl;
export const SocketService = new SS(/* [
  { imageService: "http://127.0.0.1:7081" },
] */).addClient({ core: URL_API.split("/api")[0] });
