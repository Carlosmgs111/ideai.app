import { connect } from "socket.io-client";
import { Mapfy, genRandomId } from "../../utils";

export class SocketService {
  clients: any = {};
  maxTries: number = 10;
  id = String(genRandomId());
  onConnectionEvent = () => {};
  onDisconnectionEvent = () => {};

  constructor(clients = []) {
    if (clients) {
      for (let client of clients) {
        this.addClient(client);
      }
    }
    return this;
  }

  requestConnection = (url: any) => {
    fetch(url, { method: "POST", body: JSON.stringify({ url: URL }) }).then(
      (response) => console.log({ response })
    );
  };

  addClient = (client: any) => {
    console.log(this.id);
    const token = localStorage.getItem("token")?.replaceAll('"', "");
    let tries = 0;
    const [alias, address] = Mapfy(client).entries().next().value;
    this.clients[alias] = connect(`${address}`, {
      path: "/ws",
      auth: { token },
      query: { id: this.id },
    });
    this.clients[alias].connect();
    this.clients[alias].on("connect", () => {
      console.log("Conexión establecida con el servidor.");
      this.onConnectionEvent();
    });
    this.clients[alias].on("disconnect", () => {
      this.onDisconnectionEvent();
      console.log("Conexión perdida con el servidor.");
    });
    this.clients[alias].on("message", (message: any) => {
      console.log(`Mensaje recibido del servidor: ${message.payload}`);
    });
    this.clients[alias].on("connect_error", (error: any) => {
      if (tries >= this.maxTries) return;
      console.error("Error de conexión:", error);
      tries++;
    });
    window.addEventListener("beforeunload", () => {
      this.onDisconnectionEvent();
      this.clients[alias].close();
    });
    return this;
  };

  sendMessage = (payload: any, receiverFunc?: any) => {
    const [client, sendTo, params, receiverFunctionName] =
      this.extractRemoteHandlersSpecs(payload, receiverFunc);
    if (Mapfy(this.clients).size && this.clients[client]) {
      this.clients[client].emit(sendTo, { [receiverFunctionName]: params });
      if (receiverFunc) {
        return this.receiveMessage({
          [client]: receiverFunc,
        });
      }
    }
    return this;
  };

  receiveMessage = (payload: any) => {
    let [client, receiveIn, callback] =
      this.extractRemoteHandlersSpecs(payload);
    return new Promise((resolve, reject) => {
      this.clients[client].on(receiveIn, (data: any) => {
        resolve(callback(data));
      });
    });
  };

  extractRemoteHandlersSpecs = (object: any, receiverFunc?: any) => {
    let specs = [];
    const [client, _payload] = Mapfy(object).entries().next().value;
    const [sendTo, paramsOrCallback] = Mapfy(_payload).entries().next().value;
    specs = [client, sendTo, paramsOrCallback];
    if (typeof receiverFunc === "string") specs = [...specs, receiverFunc];
    else if (receiverFunc)
      specs = [...specs, this.extractFunctionSpecs(receiverFunc)[0]];
    return specs;
  };

  extractFunctionSpecs = (object: any) => {
    let [functionName, callback] = ["function_not_provided", (...[]) => {}];
    if (object instanceof Function) {
      [functionName, callback] = [object.name, object];
    } else if (callback instanceof Object) {
      [functionName, callback] = Mapfy(object).entries().next().value;
    }
    return [functionName, callback];
  };
}
