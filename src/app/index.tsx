import styles from "./styles.module.css";
import { Router } from "../components/Router";
import { Navigation } from "../components";
import { Home, Board } from "../pages";
import { useStateValue } from "../context";


export default () => {
  const [{}, dispatch]: any = useStateValue();
  return (
    <div className={styles.app}>
      <div className={styles.header}>
        <Navigation pages={[{ label: "Board", to: "board" }]}></Navigation>
      </div>
      <div className={styles.content}>
        <Router>
          <Home path={"/"}></Home>
          <Board path={"board"}></Board>
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
