import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./app";
import { StateProvider } from "./context";
import { setActions } from "./utils";
import "./index.css";

const initialState = {
  token: "",
  markmaps: {},
};

export const actionTypes = setActions([], initialState);

const reducer = (state: any, action: any) => {
  const { payload, type }: any = action;

  const actions: any = {
    [actionTypes.setToken]: { ...state, token: payload },
    [actionTypes.setMarkmaps]: { ...state, markmaps: payload },
  };

  return actions[type] || state;
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <StateProvider {...{ initialState, reducer }}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StateProvider>
);
