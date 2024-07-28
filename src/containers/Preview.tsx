import styles from "./styles.module.css";

export const Preview = ({ children }: any) => {
  return (
    <div className={styles.container}>
      <a href={`/board?uuid=${children.props.uuid}`}>{children}</a>
      <div className={styles.dashboard}>
        <button>
          <i className={`fa-solid fa-screwdriver-wrench`}></i> Configuraciones
        </button>
        <button>
          <i className={`fa-solid fa-trash-can`}></i> Eliminar Mindmap
        </button>
      </div>
    </div>
  );
};
