import { useDropzone } from "react-dropzone";
import { useCallback, useState, Children } from "react";
import { getSizesDisposition } from "../../utils";
import config from "../../config";
import styles from "./styles.module.css";
import { useStateValue } from "../../context";
import { useNavigate } from "react-router-dom";
import { SocketService } from "../../services";
import { v4 as uuidv4 } from "uuid";

const FilesPreview = ({ children }: any): any => {
  const files = Children.toArray(children);

  // * Use reverse method only with 'flex-direction: row'
  const filePreviewSizes = getSizesDisposition(files.length);

  return files.map(
    (file: any, i: number) =>
      i >= files.length - 16 && (
        <embed
          className={styles.file_preview}
          key={i}
          src={`${file}#toolbar=0`}
          style={{
            width: `calc(${filePreviewSizes[i][0]}% - .4rem)`,
            height: `calc(${filePreviewSizes[i][1]}% - .4rem)`,
          }}
        />
      )
  );
};

export const DragNDropZone = () => {
  const [files, setFiles]: any = useState([]);
  const [{ markmaps }, dispatch]: any = useStateValue();
  const navigate = useNavigate();

  const reader = new FileReader();
  const onDrop = useCallback(
    (acceptedFiles: any) => {
      acceptedFiles.forEach((file: any) => {
        reader.onabort = () => console.log("file reading was aborted");
        reader.onerror = () => console.log("file reading has failed");
        reader.onload = () => {
          const binaryStr: any = reader.result;
          files.push(binaryStr);
          setFiles([...files]);
        };
        reader.readAsDataURL(file);
      });
    },
    [files]
  );

  const uploadFile = useCallback(
    (e: any) => {
      const uuid = uuidv4();
      dispatch({
        type: "setMarkmaps",
        payload: { ...markmaps, [uuid]: { uuid, text: "" } },
      });
      e.preventDefault();
      dispatch({ type: "setMarkmap", payload: "" });
      if (!files[0]) return;
      fetch(`${config.prodUrl}/markmap/transformfiletomarkmap`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          format: "base64",
          payload: files[0].split(",")[1],
          clientSocketID: SocketService.id,
          uuid,
        }),
      }).then((response) => {
        response.json();
      });
      navigate("/board");
    },
    [files]
  );

  const { getRootProps, getInputProps, isDragActive }: any = useDropzone({
    onDrop,
    maxFiles: 1,
    noDragEventsBubbling: true,
  });
  return (
    <div className={styles.dropzone}>
      <form
        className={`${styles.drag_body} ${files.length && styles.deactivated}`}
        action=""
        {...getRootProps()}
      >
        <FilesPreview>{files}</FilesPreview>
        <input {...getInputProps()}></input>
        {Boolean(!files.length) && (
          <>
            <span className="fa-solid fa-cloud-arrow-up"></span>
            <label>
              {isDragActive
                ? "Drop file here!"
                : "Drag and drop, or click here to select file!"}
            </label>
          </>
        )}
      </form>
      {Boolean(files.length) && (
        <button
          className={`${styles.button} ${styles.secondary_button} ${styles.floating_right}`}
          onClick={() => setFiles([])}
        >
          <i className="fa-solid fa-arrow-rotate-left"></i> Replace File
        </button>
      )}
      {Boolean(files.length) && (
        <button
          className={`${styles.button} ${styles.main_button} ${styles.floating_center}`}
          onClick={uploadFile}
        >
          <i className="fa-solid fa-diagram-project"></i> Transform Into Markmap
        </button>
      )}
    </div>
  );
};
