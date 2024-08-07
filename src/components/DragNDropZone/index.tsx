import { useDropzone } from "react-dropzone";
import { useCallback, useState, Children, useEffect } from "react";
import { getSizesDisposition } from "../../utils";
import styles from "./styles.module.css";
import { useStateValue } from "../../context";
import { MarkmapCreationForm } from "../../containers/MarkmapCreationForm";

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

export const DragNDropZone = ({ uploadFile }: any) => {
  const [files, setFiles]: any = useState([]);
  const [{}, dispatch]: any = useStateValue();
  const onClick = useCallback((e: any) => uploadFile(e, { files }), [files]);

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
  useEffect(() => dispatch({ type: "setFile", payload: files[0] }), [files]);

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
          <label>
            <i className="fa-solid fa-cloud-arrow-up"></i>
            &nbsp;&nbsp;&nbsp;&nbsp;
            {isDragActive
              ? "Suelta el archivo aquí!"
              : "Arrastrar y soltar un archivo PDF, o hacer clic aquí para empezar!"}
          </label>
        )}
      </form>
      {Boolean(files.length) && (
        <div className={styles.options}>
          <button
            onClick={() =>
              dispatch({
                type: "setCurrentModal",
                payload: <MarkmapCreationForm usefile={true} />,
              })
            }
          >
            <i className="fa-solid fa-robot"></i> Crear con Prompt
          </button>
          <button onClick={onClick}>
            <i className="fa-solid fa-file"></i> Crear con solo Archivo
          </button>
          <button onClick={() => setFiles([])}>
            <i className="fa-solid fa-arrow-rotate-left"></i> Cambiar archivo
          </button>
        </div>
      )}
    </div>
  );
};
