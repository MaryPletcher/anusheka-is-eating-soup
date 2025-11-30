import styles from './Nav.module.css';
import { Children } from 'react';
export default function Nav({ children, ...props }) {
  return (
    <p className={styles.nav} {...props}>
        {Children.map(children, child =>
            <p className = {styles.page}>
                {child}
            </p>
        )}
    </p>
  );
}