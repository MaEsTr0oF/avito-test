import { useState } from 'react';
import Modal from '@/components/Modal';
import { useUpdateAnnouncementStatusMutation } from '../../services';
import { REJECT_REASONS } from '@/constants/announcements';
import type { AnnouncementStatus } from '../../type';
import styles from './ModerationActions.module.scss';

interface ModerationActionsProps {
  announcementId: number;
  currentStatus: AnnouncementStatus;
  onSuccess?: () => void;
}

const ModerationActions = ({ announcementId, currentStatus, onSuccess }: ModerationActionsProps) => {
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [selectedReason, setSelectedReason] = useState<string>('');
  const [customReason, setCustomReason] = useState('');
  const [updateStatus, { isLoading }] = useUpdateAnnouncementStatusMutation();

  const handleApprove = async () => {
    await updateStatus({
      id: announcementId,
      status: 'approved',
    }).unwrap();
    onSuccess?.();
  };

  const handleReject = () => {
    setIsRejectModalOpen(true);
  };

  const handleRejectSubmit = async () => {
    const reason = selectedReason === 'other' ? customReason : 
      REJECT_REASONS.find(r => r.id === selectedReason)?.label || '';

    if (!reason.trim()) {
      alert('Пожалуйста, укажите причину отклонения');
      return;
    }

    await updateStatus({
      id: announcementId,
      status: 'rejected',
      reason,
    }).unwrap();
    setIsRejectModalOpen(false);
    setSelectedReason('');
    setCustomReason('');
    onSuccess?.();
  };

  const handleRework = async () => {
    await updateStatus({
      id: announcementId,
      status: 'draft',
    }).unwrap();
    onSuccess?.();
  };

  const isPending = currentStatus === 'pending';

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Действия модератора</h3>
      
      <div className={styles.actions}>
        <button
          className={`${styles.button} ${styles.button_approve}`}
          onClick={handleApprove}
          disabled={isLoading || !isPending}
          aria-label="Одобрить объявление"
        >
          <span className={styles.icon}>✓</span>
          Одобрить
        </button>

        <button
          className={`${styles.button} ${styles.button_reject}`}
          onClick={handleReject}
          disabled={isLoading || !isPending}
          aria-label="Отклонить объявление"
        >
          <span className={styles.icon}>✕</span>
          Отклонить
        </button>

        <button
          className={`${styles.button} ${styles.button_rework}`}
          onClick={handleRework}
          disabled={isLoading || !isPending}
          aria-label="Отправить на доработку"
        >
          <span className={styles.icon}>↻</span>
          На доработку
        </button>
      </div>

      {!isPending && (
        <div className={styles.hint}>
          💡 Объявление уже обработано. Статус: <strong>{currentStatus}</strong>
        </div>
      )}

      <Modal
        isOpen={isRejectModalOpen}
        onClose={() => setIsRejectModalOpen(false)}
        title="Причина отклонения"
        size="medium"
      >
        <div className={styles.modalContent}>
          <p className={styles.modalDescription}>
            Выберите причину отклонения объявления или укажите свою:
          </p>

          <div className={styles.reasons}>
            {REJECT_REASONS.map((reason) => (
              <label key={reason.id} className={styles.reason}>
                <input
                  type="radio"
                  name="rejectReason"
                  value={reason.id}
                  checked={selectedReason === reason.id}
                  onChange={(e) => setSelectedReason(e.target.value)}
                />
                <span>{reason.label}</span>
              </label>
            ))}
          </div>

          {selectedReason === 'other' && (
            <textarea
              className={styles.textarea}
              placeholder="Укажите причину отклонения..."
              value={customReason}
              onChange={(e) => setCustomReason(e.target.value)}
              rows={4}
            />
          )}

          <div className={styles.modalActions}>
            <button
              className={`${styles.button} ${styles.button_reject}`}
              onClick={handleRejectSubmit}
              disabled={isLoading || !selectedReason}
            >
              {isLoading ? 'Отправка...' : 'Отклонить'}
            </button>
            <button
              className={`${styles.button} ${styles.button_cancel}`}
              onClick={() => setIsRejectModalOpen(false)}
              disabled={isLoading}
            >
              Отмена
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ModerationActions;

