// importar la biblioteca socket.io-client
const { connect } = require("socket.io-client");

const Mapfy = (object: any) => new Map(Object.entries(object));
class SocketService {
  clients: any = {};

  constructor(clients: any = []) {
    if (clients) {
      for (let client of clients) {
        this.addClient(client);
      }
    }
    return this;
  }

  addClient = (client: any) => {
    const [alias, address] = Mapfy(client).entries().next().value;
    this.clients[alias] = connect(address);
    this.clients[alias].on("connect", () => {
      console.log("Conexión establecida con el servidor.");
    });
    this.clients[alias].on("disconnect", () => {
      console.log("Conexión perdida con el servidor.");
    });
    this.clients[alias].on("message", (message: any) => {
      console.log(`Mensaje recibido del servidor: ${message.payload}`);
    });
    this.clients[alias].on("connect_error", (error: any) => {
      console.error("Error de conexión:", error);
    });
    return this;
  };

  sendMessage = (payload: any, receiverFunc: Function) => {
    const [client, _params] = Mapfy(payload).entries().next().value;
    if (Mapfy(this.clients).size && this.clients[client]) {
      const [sendTo, params] = Mapfy(_params).entries().next().value;
      let responseName = "receiver_function_not_provided";
      if (receiverFunc) {
        responseName = receiverFunc.name;
        this.clients[client].on(responseName, receiverFunc);
      }
      this.clients[client].emit(sendTo, { [responseName]: params });
    }
  };
}

const socketService = new SocketService([
  { imageService: "http://127.0.0.1:8765" },
]);

const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const jsResponse = (message: any) => {
  const { payload, error } = message;
  console.log({ payload, error });
};

function preguntar() {
  rl.question("Ingresa un texto: \n", (texto: any) => {
    socketService.sendMessage(
      {
        imageService: { process_message: [{ message: texto }, 2] },
      },
      jsResponse
    );
    preguntar(); // Volvemos a llamar a la función para seguir preguntando
  });
}

preguntar();
