import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { StateProvider } from "./context";
import { lazyLoad, LazyComponent } from "./components/LazyComponent";
const App = lazyLoad(() => import("./app"), "App");
import { CubeGridLoader } from "./components/CubeGridLoader";
import "./index.css";

const initialState = {
  token: "",
  theme: "light",
  totalMarkmaps: 0,
  markmaps: {},
  orderedMarkmaps: [],
  sidebarFloat: true,
  currentModal: null,
  showModalFrom: "top",
  file: undefined,
  lastStore: new Date().getTime(),
};
const rootElement: any = document.getElementById("root");
ReactDOM.createRoot(rootElement).render(
  <StateProvider {...{ initialState }}>
    <BrowserRouter>
      <LazyComponent
        Component={App}
        fallback={
          <CubeGridLoader
            style={{
              height: "100vh",
            }}
          />
        }
      />
    </BrowserRouter>
  </StateProvider>
);
