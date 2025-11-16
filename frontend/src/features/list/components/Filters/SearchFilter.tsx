import { forwardRef, useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setSearch, selectSearch } from '../../slice';
import styles from './Filters.module.scss';

const SearchFilter = forwardRef<HTMLInputElement>((_, ref) => {
  const dispatch = useAppDispatch();
  const search = useAppSelector(selectSearch);
  const [placeholder, setPlaceholder] = useState('Введите название... (нажмите / для быстрого поиска)');

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setPlaceholder('Поиск... (/)');
      } else if (window.innerWidth < 1024) {
        setPlaceholder('Введите название...');
      } else {
        setPlaceholder('Введите название... (нажмите / для быстрого поиска)');
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className={styles.filters__group}>
      <label className={styles.filters__label}>Поиск по названию</label>
      <input
        ref={ref}
        type="text"
        className={styles.filters__input}
        placeholder={placeholder}
        value={search}
        onChange={(e) => dispatch(setSearch(e.target.value))}
      />
    </div>
  );
});

SearchFilter.displayName = 'SearchFilter';

export default SearchFilter;
