import { NavLink } from 'react-router-dom';
import ThemeToggle from '@/components/ThemeToggle';
import styles from './Navigation.module.scss';

const Navigation = () => {
  return (
    <nav className={styles.nav}>
      <div className={styles.container}>
        <div className={styles.brand}>
          <span className={styles.logo}>📋</span>
          <h1 className={styles.title}>Модерация Авито</h1>
        </div>

        <ul className={styles.menu}>
          <li>
            <NavLink
              to="/list"
              className={({ isActive }) =>
                isActive ? `${styles.link} ${styles.link_active}` : styles.link
              }
            >
              <span className={styles.icon}>📝</span>
              <span className={styles.text}>Объявления</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/stats"
              className={({ isActive }) =>
                isActive ? `${styles.link} ${styles.link_active}` : styles.link
              }
            >
              <span className={styles.icon}>📊</span>
              <span className={styles.text}>Статистика</span>
            </NavLink>
          </li>
        </ul>

        <ThemeToggle />
      </div>
    </nav>
  );
};

export default Navigation;

