import styles from "./styles.module.css";
import { Router } from "../components/Router";
import { Navigation } from "../components";
import { Home, Board, Dashboard, Mindmaps } from "../pages";
import { useStateValue } from "../context";
import { useEffect } from "react";
import { URL_API } from "../services";

export default () => {
  const [{ token }, dispatch]: any = useStateValue();
  useEffect(() => {
     fetch(`${URL_API}/markmap/getmanymarkmaps?size=10&page=0`, {
       method: "GET",
     })
       .then((response: any) => response.json())
       .then((data) => {
         const newMarkmaps: any = {};
         data.forEach((markmap: any) => {
           newMarkmaps[markmap.uuid] = markmap;
         });
         dispatch({ type: "setMarkmaps", payload: newMarkmaps });
       });
  }, []);
  return (
    <div className={styles.app}>
      <div className={styles.header}>e
        <Navigation
          pages={[
            { label: "Mindmaps", to: "mindmaps" },
            { label: "Board", to: "board" },
            { label: token ? "Dasboard" : "Login", to: "dashboard" },
          ]}
        ></Navigation>
      </div>
      <div className={styles.content}>
        <Router>
          <Home path={"/"}></Home>
          <Board path={"board"}></Board>
          <Dashboard path={"dashboard"}></Dashboard>
          <Mindmaps path={"mindmaps"}></Mindmaps>
        </Router>
      </div>
      <div className={styles.footer}>
        <span>
          Powered by{" "}
          <a href="https://markmap.js.org/" target="_blank">
            markmap.js.org
          </a>
        </span>
      </div>
    </div>
  );
};
