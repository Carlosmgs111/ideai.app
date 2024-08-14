import styles from "./styles.module.css";
import { useToggle } from "../../hooks/useToggle";
import { useResizeHTMLElement } from "../../hooks/useResize";
import { LogoSVG } from "./../../icons";
import { useStateValue } from "../../context";
import { Linkdex } from "./Linkdex";
import { useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";

export function Navigation({ className, pages }: any) {
  const [{ theme }, dispatch]: any = useStateValue();
  const { pathname } = useLocation();
  const referencesRefs: any = useRef({});
  const [menu, switchMenu] = useToggle(
    { show: false, name: "fas fa-bars p-2 item" },
    { show: true, name: "fas fa-times p-2 item" }
  );
  const [currentTheme, toggleCurrentTheme] = useToggle("light", "dark");
  const indicatorRef: any = useRef(null);
  const adjustIndicatorSizes = (pathname: any) => {
    if (!referencesRefs.current) return;
    const currentPath = referencesRefs.current[pathname.split("/")[1]];
    if (!currentPath) {
      indicatorRef.current.style.scale = "0";
      indicatorRef.current.style.opacity = "0";
      return;
    }
    const { offsetLeft, offsetWidth, offsetHeight, offsetTop } =
      currentPath.current;
    indicatorRef.current.style.scale = "1";
    indicatorRef.current.style.opacity = "1";
    indicatorRef.current.style.left = `${offsetLeft}px`;
    indicatorRef.current.style.width = `${offsetWidth}px`;
    indicatorRef.current.style.top = `${offsetTop}px`;
    indicatorRef.current.style.height = `${offsetHeight}px`;
  };
  const navbarContainerRef = useResizeHTMLElement(
    () => adjustIndicatorSizes(pathname),
    [pathname]
  );
  useEffect(() => {
    adjustIndicatorSizes(pathname);
  }, [pathname]);
  useEffect(() => {
    dispatch({ theme: currentTheme });
  }, [currentTheme]);

  return (
    <div
      ref={navbarContainerRef}
      className={`${styles.navbar_container} ${styles[theme]}`}
    >
      <div className={`${className} ${styles.navbar}`}>
        <div className={styles.navbar_header}>
          <Linkdex
            className={styles.banner}
            onClick={() => menu.show && switchMenu()}
            to=" "
          >
            <LogoSVG></LogoSVG>
          </Linkdex>
          <i
            className={`${menu.name} ${styles.button}`}
            id="nav-button"
            onClick={switchMenu}
          ></i>
        </div>
        <nav className={styles.navbar_indexes.concat(" ", className)}>
          <ul
            className={`${className} ${styles.itemlist} ${
              menu.show ? styles.show : ""
            }`}
          >
            <span
              ref={indicatorRef}
              id="navbar_indicator"
              className={styles.indicator}
            ></span>
            {pages &&
              pages.map(({ to, label }: any, index: any) => {
                referencesRefs.current[to] = { current: null };
                const linkRef = referencesRefs.current[to];
                return (
                  <Linkdex
                    linkRef={linkRef}
                    key={index}
                    to={to}
                    id={index}
                    onClick={() => menu.show && switchMenu()}
                  >
                    {label}
                  </Linkdex>
                );
              })}
            {/* {login && (
              <Linkdex
                className={styles.avatar}
                to={login.to}
                onClick={!token && login?.onClick}
              >
                {token ? (
                  <img
                    src={avatar}
                    onClick={() => menu.show && switchMenu()}
                    alt="Profile user avatar"
                  />
                ) : (
                  "Login"
                )}
              </Linkdex>
            )} */}
          </ul>
        </nav>
      </div>
      <div className={`${styles.page_settings}  ${menu.show && styles.show}`}>
        <button
          className={
            currentTheme === "light" ? "fa-solid fa-moon" : "fa-solid fa-sun"
          }
          onClick={toggleCurrentTheme}
        ></button>
      </div>
    </div>
  );
}
