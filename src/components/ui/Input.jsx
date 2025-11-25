import styles from './Input.module.css';

export default function Input({ type = "text", children, ...props }) {
  return (
    <input type = {type} className={styles[type]} {...props}/>
  );
}