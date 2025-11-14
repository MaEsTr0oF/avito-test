import type { FC } from 'react';
import { useAppDispatch } from '@/store/hooks';
import { resetFilters } from '../../slice';
import SearchFilter from './SearchFilter';
import StatusFilter from './StatusFilter';
import CategoryFilter from './CategoryFilter';
import PriorityFilter from './PriorityFilter';
import PriceFilter from './PriceFilter';
import SortFilter from './SortFilter';
import styles from './Filters.module.scss';

const Filters: FC = () => {
  const dispatch = useAppDispatch();

  return (
    <div className={styles.filters}>
      <div className={styles.filters__section}>
        <h3 className={styles.filters__title}>Фильтры</h3>
        <SearchFilter />
        <StatusFilter />
        <CategoryFilter />
        <PriorityFilter />
        <PriceFilter />
      </div>

      <SortFilter />

      <button 
        className={styles.filters__reset} 
        onClick={() => dispatch(resetFilters())}
      >
        Сбросить фильтры
      </button>
    </div>
  );
};

export default Filters;
