import type { FC } from 'react';
import SearchFilter from '../Filters/SearchFilter';
import SortFilter from '../Filters/SortFilter';
import styles from './FiltersBar.module.scss';

const FiltersBar: FC = () => {
  return (
    <div className={styles.filtersBar}>
      <div className={styles.filtersBar__search}>
        <SearchFilter />
      </div>
      <div className={styles.filtersBar__sort}>
        <SortFilter />
      </div>
    </div>
  );
};

export default FiltersBar;

