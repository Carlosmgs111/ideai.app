import styles from "./styles.module.css";
import { Router } from "../components/Router";
import { Navigation } from "../components/Navigation";
import { Home } from "../pages/home";

function App() {
  return (
    <div className={styles.app}>
      <div className={styles.header}>
        <Navigation pages={[{ label: "Home", to: "home" }]}></Navigation>
      </div>
      <div className={styles.content}>
        <Router>
          <Home path={"/"}></Home>
          <Home path={"home"}></Home>
        </Router>
      </div>
    </div>
  );
}

export default App;
