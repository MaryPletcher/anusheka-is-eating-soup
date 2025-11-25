import styles from './TextArea.module.css';

export default function TextArea({ children, ...props }) {
  return (
    <textarea className={styles.textarea} {...props}>
      {children}
    </textarea>
  );
}