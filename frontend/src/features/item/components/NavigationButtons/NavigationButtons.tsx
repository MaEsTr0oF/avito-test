import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '@/store/hooks';
import styles from './NavigationButtons.module.scss';

interface NavigationButtonsProps {
  currentId: number;
}

const NavigationButtons = ({ currentId }: NavigationButtonsProps) => {
  const navigate = useNavigate();
  const announcements = useAppSelector((state) => state.list.items);

  const currentIndex = announcements.findIndex((item) => item.id === currentId);
  const prevItem = currentIndex > 0 ? announcements[currentIndex - 1] : null;
  const nextItem = currentIndex < announcements.length - 1 && currentIndex !== -1 
    ? announcements[currentIndex + 1] 
    : null;

  if (announcements.length === 0) {
    return null;
  }

  return (
    <div className={styles.container}>
      <button
        className={`${styles.button} ${styles.button_prev}`}
        onClick={() => prevItem && navigate(`/item/${prevItem.id}`)}
        disabled={!prevItem}
        aria-label="Предыдущее объявление"
      >
        <span className={styles.icon}>❮</span>
        <span className={styles.label}>Предыдущее</span>
      </button>

      <div className={styles.counter}>
        {currentIndex !== -1 ? (
          <>
            <span className={styles.current}>{currentIndex + 1}</span>
            <span className={styles.separator}>/</span>
            <span className={styles.total}>{announcements.length}</span>
          </>
        ) : (
          <span className={styles.unknown}>—</span>
        )}
      </div>

      <button
        className={`${styles.button} ${styles.button_next}`}
        onClick={() => nextItem && navigate(`/item/${nextItem.id}`)}
        disabled={!nextItem}
        aria-label="Следующее объявление"
      >
        <span className={styles.label}>Следующее</span>
        <span className={styles.icon}>❯</span>
      </button>
    </div>
  );
};

export default NavigationButtons;

