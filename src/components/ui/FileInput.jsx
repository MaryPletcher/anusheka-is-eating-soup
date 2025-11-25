import styles from "./FileInput.module.css";
import uploadIcon from "../../media/upload.svg";

export default function FileInput({ label, onChange, previewUrl, accept, ...props }) {
    return (
        <div className={styles.wrapper}>
        <label className={styles.customLabel}>
        <input
            type="file"
            accept={accept}
            className={styles.hiddenInput}
            onChange={onChange}
            {...props}
        />
            <img
            src= {previewUrl || uploadIcon}   // upload icon image
            alt="preview"
            className={styles.icon}
            />
            <span>{label || "Upload a soup pic!"}</span>
        </label>
        </div>
    );
}