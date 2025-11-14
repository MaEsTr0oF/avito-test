import type { FC } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setStatuses, selectStatuses } from '../../slice';
import styles from './Filters.module.scss';

const STATUSES = [
  { value: 'pending', label: 'На модерации' },
  { value: 'approved', label: 'Одобрено' },
  { value: 'rejected', label: 'Отклонено' },
  { value: 'draft', label: 'Черновик' },
] as const;

const StatusFilter: FC = () => {
  const dispatch = useAppDispatch();
  const statuses = useAppSelector(selectStatuses);

  const handleStatusToggle = (status: 'pending' | 'approved' | 'rejected' | 'draft') => {
    if (statuses.includes(status)) {
      dispatch(setStatuses(statuses.filter((s) => s !== status)));
    } else {
      dispatch(setStatuses([...statuses, status]));
    }
  };

  return (
    <div className={styles.filters__group}>
      <label className={styles.filters__label}>Статус</label>
      <div className={styles.filters__checkboxes}>
        {STATUSES.map((status) => (
          <label key={status.value} className={styles.filters__checkbox}>
            <input
              type="checkbox"
              checked={statuses.includes(status.value)}
              onChange={() => handleStatusToggle(status.value)}
            />
            <span>{status.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default StatusFilter;
