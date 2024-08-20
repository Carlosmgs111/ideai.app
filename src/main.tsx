import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./app";
import { StateProvider } from "./context";
import "./index.css";

const initialState = {
  token: "",
  theme: "light",
  markmaps: {},
  sidebarFloat: true,
  currentModal: null,
  showModalFrom: "top",
  file: undefined,
  lastStore: new Date().getTime(),
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <StateProvider {...{ initialState }}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StateProvider>
);
