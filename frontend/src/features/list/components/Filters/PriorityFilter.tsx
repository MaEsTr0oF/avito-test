import type { FC } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setPriority, selectPriority } from '../../slice';
import styles from './Filters.module.scss';

const PriorityFilter: FC = () => {
  const dispatch = useAppDispatch();
  const priority = useAppSelector(selectPriority);

  return (
    <div className={styles.filters__group}>
      <label className={styles.filters__label}>Приоритет</label>
      <select
        className={styles.filters__select}
        value={priority ?? ''}
        onChange={(e) => {
          const value = e.target.value;
          dispatch(setPriority(value === '' ? undefined : (value as 'normal' | 'urgent')));
        }}
      >
        <option value="">Все</option>
        <option value="normal">Обычный</option>
        <option value="urgent">Срочный</option>
      </select>
    </div>
  );
};

export default PriorityFilter;
