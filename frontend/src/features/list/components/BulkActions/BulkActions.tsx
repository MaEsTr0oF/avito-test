import { type FC } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { selectSelectedIds, clearSelection } from '../../slice';
import { useUpdateAnnouncementStatusMutation } from '../../services';
import styles from './BulkActions.module.scss';

interface BulkActionsProps {
  onSuccess?: () => void;
}

const BulkActions: FC<BulkActionsProps> = ({ onSuccess }) => {
  const dispatch = useAppDispatch();
  const selectedIds = useAppSelector(selectSelectedIds);
  const [updateStatus, { isLoading }] = useUpdateAnnouncementStatusMutation();

  const handleBulkApprove = async () => {
    try {
      await Promise.all(
        selectedIds.map((id) =>
          updateStatus({ id, status: 'approved' }).unwrap()
        )
      );
      dispatch(clearSelection());
      onSuccess?.();
    } catch {
      alert('Ошибка при массовом одобрении');
    }
  };

  const handleBulkReject = async () => {
    const reason = prompt('Укажите причину отклонения для всех выбранных объявлений:');
    if (!reason) return;

    try {
      await Promise.all(
        selectedIds.map((id) =>
          updateStatus({ id, status: 'rejected', reason }).unwrap()
        )
      );
      dispatch(clearSelection());
      onSuccess?.();
    } catch {
      alert('Ошибка при массовом отклонении');
    }
  };

  const handleClearSelection = () => {
    dispatch(clearSelection());
  };

  if (selectedIds.length === 0) {
    return null;
  }

  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <span className={styles.count}>Выбрано: {selectedIds.length}</span>
        <span>объявлений для массовой обработки</span>
      </div>
      
      <div className={styles.actions}>
        <button
          className={`${styles.button} ${styles.button_approve}`}
          onClick={handleBulkApprove}
          disabled={isLoading}
          aria-label="Массово одобрить"
        >
          <span className={styles.icon}>✓</span>
          {isLoading ? 'Обработка...' : 'Одобрить все'}
        </button>

        <button
          className={`${styles.button} ${styles.button_reject}`}
          onClick={handleBulkReject}
          disabled={isLoading}
          aria-label="Массово отклонить"
        >
          <span className={styles.icon}>✕</span>
          {isLoading ? 'Обработка...' : 'Отклонить все'}
        </button>

        <button
          className={`${styles.button} ${styles.button_clear}`}
          onClick={handleClearSelection}
          disabled={isLoading}
          aria-label="Снять выделение"
        >
          <span className={styles.icon}>↻</span>
          Отменить выбор
        </button>
      </div>
    </div>
  );
};

export default BulkActions;

