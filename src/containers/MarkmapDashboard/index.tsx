import styles from "./styles.module.css";

export const MarkmapDashboard = ({ uuid, title }: any) => {
  uuid;
  return (
    <div className={styles.dashboard_body}>
      <h1>{title}</h1>

      <article>
        Aqui van a ir todas las configuraciones relacionadas a la administracion
        de cada mindmap, como por ejemplo la configuracion de temas, la
        asociacion a otros mindmaps, la visibilidad, es decir si son publicas o
        privadas, el manejo en ambitos de propiedad intelectual, como por
        ejemplo si se trata de contenido protegido o referenciado a terceros,
        manejo de exportacion, habilitacion de colaboradores, administracion de
        etiquetas entre otras mas
      </article>

      <section className={styles.section}>
        <div>
          <div>Hola</div>
          <div>Mundo</div>
        </div>
      </section>
      <section className={styles.section}>
        <div>
          <span></span>
          <button className={` ${styles.caution}`}>
            <i className={`fa-solid fa-trash-can`}></i> Eliminar este Mindmap
          </button>
        </div>
      </section>
    </div>
  );
};
