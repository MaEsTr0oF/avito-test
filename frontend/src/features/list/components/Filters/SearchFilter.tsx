import { forwardRef } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setSearch, selectSearch } from '../../slice';
import styles from './Filters.module.scss';

const SearchFilter = forwardRef<HTMLInputElement>((_, ref) => {
  const dispatch = useAppDispatch();
  const search = useAppSelector(selectSearch);

  return (
    <div className={styles.filters__group}>
      <label className={styles.filters__label}>Поиск по названию</label>
      <input
        ref={ref}
        type="text"
        className={styles.filters__input}
        placeholder="Введите название..."
        value={search}
        onChange={(e) => dispatch(setSearch(e.target.value))}
      />
    </div>
  );
});

SearchFilter.displayName = 'SearchFilter';

export default SearchFilter;
