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
  items.map((item: any, index: number) => {
    const { title, reference } = item;
    const href = redirect
      ? `/${redirect}#${labelCases(reference).LS}`
      : `#${labelCases(reference).LS}`;
    indexesList.push(
      <a
        className={`
      ${styles.item} 
      ${refs[labelCases(reference).LS] ? styles.active : ""}`}
        key={index}
        href={href}
      >
        <i
          className={`
        fa-solid fa-circle-dot 
        ${styles.icon} ${expand && styles.hidden}
        ${refs[labelCases(reference).LS] ? styles.active : ""}`}
        ></i>
        {innerItems && (
          <i
            {...{
              className: styles.inner.concat(" ", expand ? styles.show : ""),
            }}
          >
            {labelCases(title).CS}
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
