import styles from './Nav.module.css';
import { Link } from 'react-router-dom';
import { Children } from 'react';
export default function Nav({ children, ...props }) {
  return (
    <div className={styles.navBg}>
      <p className={styles.nav} {...props}>
        <p className = {styles.page}>
              <Link to = "/">soup history</Link>
              <a> | </a>
              <Link to = "/ControlPanelPage">control panel</Link>
              <a> | </a>
              <Link to = "/BirthdayMessagePage">happy birthday!</Link>
          </p>
          {/* {Children.map(children, child =>
              <p className = {styles.page}>
                  <Link to = "/">soup history</Link>
                  <a> | </a>
                  <Link to = "/ControlPanelPage">soup control panel</Link>
                  <a> | </a>
                  <Link to = "/BirthdayMessagePage">happy birthday!</Link>
              </p>
          )} */}
      </p>
    </div>
  );
}