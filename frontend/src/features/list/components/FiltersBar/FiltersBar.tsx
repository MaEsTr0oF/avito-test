import { forwardRef, useRef, useImperativeHandle } from 'react';
import SearchFilter from '../Filters/SearchFilter';
import SortFilter from '../Filters/SortFilter';
import styles from './FiltersBar.module.scss';

export interface FiltersBarRef {
  focusSearch: () => void;
}

const FiltersBar = forwardRef<FiltersBarRef>((_, ref) => {
  const searchInputRef = useRef<HTMLInputElement>(null);

  useImperativeHandle(ref, () => ({
    focusSearch: () => {
      searchInputRef.current?.focus();
    },
  }));

  return (
    <div className={styles.filtersBar}>
      <div className={styles.filtersBar__search}>
        <SearchFilter ref={searchInputRef} />
      </div>
      <div className={styles.filtersBar__sort}>
        <SortFilter />
      </div>
    </div>
  );
});

FiltersBar.displayName = 'FiltersBar';

export default FiltersBar;

