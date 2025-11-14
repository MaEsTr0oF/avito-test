import { useState, type FC } from 'react';
import { useAppDispatch } from '@/store/hooks';
import { resetFilters } from '../../slice';
import StatusFilter from '../Filters/StatusFilter';
import CategoryFilter from '../Filters/CategoryFilter';
import PriorityFilter from '../Filters/PriorityFilter';
import PriceFilter from '../Filters/PriceFilter';
import styles from './FiltersSidebar.module.scss';

const FiltersSidebar: FC = () => {
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button 
        className={styles.mobileToggle}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Открыть фильтры"
      >
        <span className={styles.mobileToggle__icon}>
          {isOpen ? '✕' : '☰'}
        </span>
        <span className={styles.mobileToggle__text}>Фильтры</span>
      </button>

      <aside className={`${styles.sidebar} ${isOpen ? styles.sidebar_open : ''}`}>
        <div className={styles.sidebar__header}>
          <h2 className={styles.sidebar__title}>Фильтры</h2>
          <button 
            className={styles.sidebar__reset} 
            onClick={() => dispatch(resetFilters())}
            title="Сбросить все фильтры"
          >
            ✕ Сбросить
          </button>
        </div>

        <div className={styles.sidebar__content}>
          <StatusFilter />
          <CategoryFilter />
          <PriorityFilter />
          <PriceFilter />
        </div>
      </aside>

      {isOpen && (
        <div 
          className={styles.overlay}
          onClick={() => setIsOpen(false)}
          aria-label="Закрыть фильтры"
        />
      )}
    </>
  );
};

export default FiltersSidebar;
