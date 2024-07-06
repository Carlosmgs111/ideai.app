import styles from "./styles.module.css";
import { DragNDropZone } from "../../components";

export const Home = ({}: any) => {
  return (
    <div className={styles.page}>
      <div className={styles.hero}>
        <h1>Transform PDFs into Mindmaps</h1>
        <article>
          Our AI-powered application extracts key information from your PDF
          documents and transforms them into visually engaging mindmaps.
          Streamline your research, planning, and collaboration workflows.
        </article>
        <div>
          <button className={`${styles.button} ${styles.main_button}`}>
            <i className="fa-solid fa-upload"></i> Upload File
          </button>
          <button className={`${styles.button} ${styles.secondary_button}`}>
            Learn More
          </button>
        </div>
        <DragNDropZone></DragNDropZone>
      </div>
    </div>
  );
};
