import type {FC} from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setCategoryId, selectCategoryId } from '../../slice';
import styles from './Filters.module.scss';

const CATEGORIES = [
  { id: 0, name: 'Электроника' },
  { id: 1, name: 'Недвижимость' },
  { id: 2, name: 'Транспорт' },
  { id: 3, name: 'Работа' },
  { id: 4, name: 'Услуги' },
  { id: 5, name: 'Животные' },
  { id: 6, name: 'Мода' },
  { id: 7, name: 'Детское' },
];

const CategoryFilter: FC = () => {
  const dispatch = useAppDispatch();
  const categoryId = useAppSelector(selectCategoryId);

  return (
    <div className={styles.filters__group}>
      <label className={styles.filters__label}>Категория</label>
      <select
        className={styles.filters__select}
        value={categoryId ?? ''}
        onChange={(e) => {
          const value = e.target.value;
          dispatch(setCategoryId(value === '' ? undefined : parseInt(value)));
        }}
      >
        <option value="">Все категории</option>
        {CATEGORIES.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CategoryFilter;
