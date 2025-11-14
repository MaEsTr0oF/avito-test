import type { FC } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setSortBy, setSortOrder, selectSortBy, selectSortOrder } from '../../slice';
import { SORT_OPTIONS, SORT_ORDER_OPTIONS, type SortField, type SortOrder } from '@/constants/announcements';
import styles from './Filters.module.scss';

const SortFilter: FC = () => {
  const dispatch = useAppDispatch();
  const sortBy = useAppSelector(selectSortBy);
  const sortOrder = useAppSelector(selectSortOrder);

  return (
    <>
      <div className={styles.filters__group}>
        <label className={styles.filters__label}>Сортировать по</label>
        <select
          className={styles.filters__select}
          value={sortBy}
          onChange={(e) => dispatch(setSortBy(e.target.value as SortField))}
        >
          {SORT_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.filters__group}>
        <label className={styles.filters__label}>Порядок</label>
        <select
          className={styles.filters__select}
          value={sortOrder}
          onChange={(e) => dispatch(setSortOrder(e.target.value as SortOrder))}
        >
          {SORT_ORDER_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};

export default SortFilter;
