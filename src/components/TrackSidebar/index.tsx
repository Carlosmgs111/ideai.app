import { labelCases, mapToList } from "../../utils";
import { useToggle } from "../../hooks/useToggle";
import styles from "./styles.module.css";
import { useMemo } from "react";
import { Memo } from "../../hocs/Memo";
import { useStateValue } from "../../context";

export function TrackSidebar(props: any) {
  const [{ theme }]: any = useStateValue();
  const {
    items = {},
    innerItems = true,
    direction = "column",
    isactive = 1,
    expanded = !false,
    showbutton = 1,
    width = "available",
    redirect = "",
  }: any = props;
  const [expand, switchExpand] = useToggle(
    showbutton ? expanded : 1,
    !expanded
  );

  const indexesList: any = useMemo(
    () =>
      mapToList(items).map((item: any, index: number) => {
        const { title, reference } = item;
        const href = redirect
          ? `/${redirect}#${labelCases(reference).LS}`
          : `#${labelCases(reference).LS}`;
        return (
          <a
            className={`
      ${styles.item} 
      ${item.isVisible ? styles.active : ""}`}
            key={index}
            href={href}
          >
            <i
              className={`
        fa-solid fa-circle-dot 
        ${styles.icon} ${expand && styles.hidden}
        ${item.isVisible ? styles.active : ""}`}
            ></i>
            {innerItems && (
              <i
                {...{
                  className: styles.inner.concat(
                    " ",
                    expand ? styles.show : ""
                  ),
                }}
              >
                {title}
              </i>
            )}
          </a>
        );
      }),
    [mapToList(items)]
  );

  return (
    <Memo deps={[indexesList]}>
      <section
        {...{
          ...props,
          style: { flexDirection: direction, width },
          className: `${styles.body} ${isactive && styles.active} ${
            styles[theme]
          }`,
        }}
      >
        {innerItems && Boolean(showbutton) && (
          <div className={styles.header}>
            <i
              key="0"
              className={`fa-solid 
            ${expand ? "fa-xmark" : "fa-bars"}
            ${styles.item}`}
              onClick={switchExpand}
            />
          </div>
        )}
        {indexesList}
      </section>
    </Memo>
  );
}
