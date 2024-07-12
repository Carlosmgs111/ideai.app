import styles from "./styles.module.css";
import { Router } from "../components/Router";
import { Navigation } from "../components";
import { Home, Board, Dashboard, Mindmaps } from "../pages";
import { useStateValue } from "../context";

export default () => {
  const [{ token }]: any = useStateValue();
  return (
    <div className={styles.app}>
      <div className={styles.header}>
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
