import styles from "./styles.module.css";
import { Router } from "../hocs/Router";
import { Navigation } from "../components";
import { useStateValue } from "../context";
import { useEffect } from "react";
import { URL_API } from "../services";
import { Mapfy } from "../utils";
import { LazyComponent, lazyLoad } from "../components/LazyComponent";
import { Memo } from "../hocs/Memo";

export default () => {
  const [{ theme, token, markmaps }, dispatch]: any = useStateValue();
  useEffect(() => {
    if (Mapfy(markmaps).size) return;
    fetch(`${URL_API}/markmap/countofmarkmaps`, {
      method: "GET",
    })
      .then((response: any) => response.json())
      .then(({ totalMarkmaps }: any) => {
        fetch(`${URL_API}/markmap/getmanymarkmaps?size=20&page=0`, {
          method: "GET",
        })
          .then((response: any) => response.json())
          .then((data) => {
            const newMarkmaps: any = {};
            data.forEach((markmap: any) => {
              newMarkmaps[markmap.uuid] = markmap;
            });
            dispatch({
              markmaps: newMarkmaps,
              totalMarkmaps,
            });
          });
      });
  }, []);
  return (
    <div className={`${styles.app} ${styles[theme]}`}>
      <div className={styles.header}>
        <Navigation
          pages={[
            { label: "Mindmaps", to: "mindmaps" },
            { label: "Board", to: "board" },
            {
              label: token ? "Dasboard" : "Login",
              to: token ? "dashboard" : "login",
            },
          ]}
        ></Navigation>
      </div>
      <div className={styles.content}>
        <Memo>
          <Router>
            <LazyComponent
              Component={lazyLoad(() => import("../pages/Home"), "Home")}
              path={"/"}
            ></LazyComponent>
            <LazyComponent
              Component={lazyLoad(() => import("../pages/Board"), "Board")}
              path={"board"}
            ></LazyComponent>
            <LazyComponent
              Component={lazyLoad(
                () => import("../pages/Dashboard"),
                "Dashboard"
              )}
              path={"dashboard"}
            ></LazyComponent>
            <LazyComponent
              Component={lazyLoad(
                () => import("../pages/Mindmaps"),
                "Mindmaps"
              )}
              path={"mindmaps"}
            ></LazyComponent>
            <LazyComponent
              Component={lazyLoad(() => import("../pages/Learn"), "Learn")}
              path={"learn/markmap"}
            ></LazyComponent>
          </Router>
        </Memo>
      </div>
      <div className={styles.footer}>
        <span>
          Powered by &nbsp;
          <a href="https://markmap.js.org/" target="_blank">
            markmap.js.org
          </a>
        </span>
      </div>
    </div>
  );
};
