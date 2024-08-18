import styles from "./styles.module.css";
import { Router } from "../hocs/Router";
import { Navigation } from "../components";
import { Home, Board, Dashboard, Mindmaps, Learn } from "../pages";
import { useStateValue } from "../context";
import { useEffect } from "react";
import { URL_API } from "../services";
import { Modal } from "../components/Modal";
import { Mapfy } from "../utils";

export default () => {
  const [{ currentModal, theme, markmaps }, dispatch]: any = useStateValue();
  useEffect(() => {
    if (Mapfy(markmaps).size) return;
    fetch(`${URL_API}/markmap/getmanymarkmaps?size=100&page=0`, {
      method: "GET",
    })
      .then((response: any) => response.json())
      .then((data) => {
        const newMarkmaps: any = {};
        data.reverse().forEach((markmap: any) => {
          newMarkmaps[markmap.uuid] = markmap;
        });
        dispatch({ markmaps: newMarkmaps });
      });
  }, []);
  return (
    <div className={`${styles.app} ${styles[theme]}`}>
      <div className={styles.header}>
        <Navigation
          pages={[
            { label: "Mindmaps", to: "mindmaps" },
            { label: "Board", to: "board" },
            // { label: token ? "Dasboard" : "Login", to: "dashboard" },
          ]}
        ></Navigation>
      </div>
      <div className={styles.content}>
        <Router>
          <Home path={"/"}></Home>
          <Board path={"board"}></Board>
          <Dashboard path={"dashboard"}></Dashboard>
          <Mindmaps path={"mindmaps"}></Mindmaps>
          <Learn path={"learn/markmap"}></Learn>
        </Router>
      </div>
      <Modal onClick={() => dispatch({ currentModal: null })}>
        {currentModal}
      </Modal>
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
