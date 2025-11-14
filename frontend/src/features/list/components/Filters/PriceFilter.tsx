import type {FC} from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setMinPrice, setMaxPrice, selectMinPrice, selectMaxPrice } from '../../slice';
import styles from './Filters.module.scss';

const PriceFilter: FC = () => {
  const dispatch = useAppDispatch();
  const minPrice = useAppSelector(selectMinPrice);
  const maxPrice = useAppSelector(selectMaxPrice);

  return (
    <div className={styles.filters__group}>
      <label className={styles.filters__label}>Диапазон цен (₽)</label>
      <div className={styles.filters__priceRange}>
        <input
          type="number"
          className={styles.filters__input}
          placeholder="От"
          value={minPrice ?? ''}
          onChange={(e) => {
            const value = e.target.value;
            dispatch(setMinPrice(value === '' ? undefined : parseFloat(value)));
          }}
        />
        <span className={styles.filters__separator}>—</span>
        <input
          type="number"
          className={styles.filters__input}
          placeholder="До"
          value={maxPrice ?? ''}
          onChange={(e) => {
            const value = e.target.value;
            dispatch(setMaxPrice(value === '' ? undefined : parseFloat(value)));
          }}
        />
      </div>
    </div>
  );
};

export default PriceFilter;
