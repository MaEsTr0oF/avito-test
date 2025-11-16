import type { FC } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setPriority, selectPriority } from '../../slice';
import styles from './UrgentToggle.module.scss';

const UrgentToggle: FC = () => {
  const dispatch = useAppDispatch();
  const priority = useAppSelector(selectPriority);
  const isUrgentOnly = priority === 'urgent';

  const handleToggle = () => {
    dispatch(setPriority(isUrgentOnly ? undefined : 'urgent'));
  };

  return (
    <label className={styles.urgentToggle}>
      <input
        type="checkbox"
        checked={isUrgentOnly}
        onChange={handleToggle}
        className={styles.urgentToggle__input}
      />
      <span className={styles.urgentToggle__slider}></span>
      <span className={styles.urgentToggle__label}>
        🔥 Только срочные
      </span>
    </label>
  );
};

export default UrgentToggle;

