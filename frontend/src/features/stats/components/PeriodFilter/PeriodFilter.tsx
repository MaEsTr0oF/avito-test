import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setPeriod, selectPeriod } from '../../slice';
import type { Period } from '../../type';
import styles from './PeriodFilter.module.scss';

const PERIODS: { value: Period; label: string }[] = [
  { value: 'today', label: 'Сегодня' },
  { value: '7days', label: 'Последние 7 дней' },
  { value: '30days', label: 'Последние 30 дней' },
];

const PeriodFilter = () => {
  const dispatch = useAppDispatch();
  const currentPeriod = useAppSelector(selectPeriod);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setPeriod(e.target.value as Period));
  };

  return (
    <div className={styles.container}>
      <label htmlFor="period-select" className={styles.label}>
        Период:
      </label>
      <select
        id="period-select"
        value={currentPeriod}
        onChange={handleChange}
        className={styles.select}
      >
        {PERIODS.map((period) => (
          <option key={period.value} value={period.value}>
            {period.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default PeriodFilter;

