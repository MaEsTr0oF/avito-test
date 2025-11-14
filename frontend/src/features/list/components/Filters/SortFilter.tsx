import type { FC } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setSortBy, setSortOrder, selectSortBy, selectSortOrder } from '../../slice';
import styles from './Filters.module.scss';

const SortFilter: FC = () => {
  const dispatch = useAppDispatch();
  const sortBy = useAppSelector(selectSortBy);
  const sortOrder = useAppSelector(selectSortOrder);

  return (
    <div className={styles.filters__section}>
      <h3 className={styles.filters__title}>Сортировка</h3>
      
      <div className={styles.filters__group}>
        <label className={styles.filters__label}>Сортировать по</label>
        <select
          className={styles.filters__select}
          value={sortBy}
          onChange={(e) => dispatch(setSortBy(e.target.value as 'createdAt' | 'price' | 'priority'))}
        >
          <option value="createdAt">Дате создания</option>
          <option value="price">Цене</option>
          <option value="priority">Приоритету</option>
        </select>
      </div>

      <div className={styles.filters__group}>
        <label className={styles.filters__label}>Порядок</label>
        <select
          className={styles.filters__select}
          value={sortOrder}
          onChange={(e) => dispatch(setSortOrder(e.target.value as 'asc' | 'desc'))}
        >
          <option value="desc">По убыванию</option>
          <option value="asc">По возрастанию</option>
        </select>
      </div>
    </div>
  );
};

export default SortFilter;
