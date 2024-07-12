import { labelCases } from "../../utils";
import { useToggle } from "../../hooks/useToggle";
import styles from "./styles.module.css";

export function TrackSidebar(props: any) {
  const {
    items = [],
    refs = [],
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
  const indexesList: any = [];
  items.map((name: any, index: number) => {
    const href = redirect
      ? `/${redirect}#${labelCases(name).LS}`
      : `#${labelCases(name).LS}`;
    const active = refs.includes(labelCases(name).LS);
    indexesList.push(
      <a
        className={`
      ${styles.item} 
      ${active ? styles.active : ""}`}
        key={index}
        href={href}
      >
        <i
          className={`
        fa-solid fa-circle-dot 
        ${styles.icon} ${expand && styles.hidden}
        ${active ? styles.active : ""}`}
        ></i>
        {innerItems && (
          <i
            {...{
              className: styles.inner.concat(" ", expand ? styles.show : ""),
            }}
          >
            {labelCases(name).CS}
          </i>
        )}
      </a>
    );
  });

  return (
    <section
      {...{
        ...props,
        style: { flexDirection: direction, width },
        className: styles.body.concat(" ", isactive && styles.active),
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
  );
}
