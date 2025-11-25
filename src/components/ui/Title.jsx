import styles from './Title.module.css';

export default function Title({ children, ...props }) {
  return (
    <p className={styles.title} {...props}>
      {children}
    </p>
  );
}