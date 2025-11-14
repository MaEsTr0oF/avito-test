import type { ModerationHistoryItem } from '../../type';
import { formatDateTime } from '@/utils';
import styles from './ModerationHistory.module.scss';

interface ModerationHistoryProps {
  history: ModerationHistoryItem[];
}

const ModerationHistory = ({ history }: ModerationHistoryProps) => {
  if (history.length === 0) {
    return (
      <div className={styles.container}>
        <h3 className={styles.title}>История модерации</h3>
        <div className={styles.empty}>
          <p>📜 История пуста</p>
          <p className={styles.emptyHint}>Пока не было действий модераторов</p>
        </div>
      </div>
    );
  }

  const getActionLabel = (action: string) => {
    switch (action) {
      case 'approved':
        return 'Одобрено';
      case 'rejected':
        return 'Отклонено';
      case 'pending':
        return 'На проверке';
      default:
        return action;
    }
  };

  const getActionClass = (action: string) => {
    switch (action) {
      case 'approved':
        return styles.decision_approved;
      case 'rejected':
        return styles.decision_rejected;
      case 'pending':
        return styles.decision_rework;
      default:
        return '';
    }
  };

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>История модерации</h3>
      
      <div className={styles.timeline}>
        {history.map((item, index) => (
          <div key={item.id} className={styles.item}>
            <div className={styles.marker}>
              <div className={`${styles.dot} ${getActionClass(item.action)}`} />
              {index !== history.length - 1 && <div className={styles.line} />}
            </div>
            
            <div className={styles.content}>
              <div className={styles.header}>
                <span className={`${styles.decision} ${getActionClass(item.action)}`}>
                  {getActionLabel(item.action)}
                </span>
                <span className={styles.date}>
                  {formatDateTime(item.timestamp)}
                </span>
              </div>
              
              <div className={styles.moderator}>
                Модератор: <strong>{item.moderatorName}</strong>
              </div>
              
              {item.comment && (
                <div className={styles.comment}>
                  <span className={styles.commentIcon}>💬</span>
                  {item.comment}
                </div>
              )}
              
              {item.reason && (
                <div className={styles.reason}>
                  <span className={styles.reasonIcon}>⚠️</span>
                  Причина: {item.reason}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ModerationHistory;

