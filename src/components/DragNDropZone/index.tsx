import { useDropzone } from "react-dropzone";
import { useCallback, useState, Children } from "react";
import { getSizesDisposition } from "../../utils";
import styles from "./styles.module.css";

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

  const onDrop = useCallback((acceptedFiles: any) => {
    acceptedFiles.forEach((file: any) => {
      const reader = new FileReader();
      reader.onabort = () => console.log("file reading was aborted");
      reader.onerror = () => console.log("file reading has failed");
      reader.onload = () => {
        const binaryStr: any = reader.result;
        files.push(binaryStr);
        setFiles([...files]);
      };
      reader.readAsDataURL(file);
    });
  }, [files]);

  const { getRootProps, getInputProps, isDragActive }: any = useDropzone({
    onDrop,
    maxFiles: 1,
  });
  return (
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
              : "Drag file and drop file, or click here to upload!"}
          </label>
        </>
      )}
      {Boolean(files.length) && (
        <button
          className={`${styles.button} ${styles.main_button} ${styles.floating}`}
          onClick={() => setFiles([])}
        >
          Replace file
        </button>
      )}
    </form>
  );
};
