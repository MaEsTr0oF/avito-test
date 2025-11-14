import { useState, useEffect } from 'react';
import styles from './AutoRefresh.module.scss';

interface AutoRefreshProps {
  onRefresh: () => void;
  interval?: number;
}

const AUTO_REFRESH_INTERVAL = 5 * 60 * 1000;

const AutoRefresh = ({ onRefresh, interval = AUTO_REFRESH_INTERVAL }: AutoRefreshProps) => {
  const [secondsLeft, setSecondsLeft] = useState(interval / 1000);
  const [isEnabled, setIsEnabled] = useState(true);

  useEffect(() => {
    if (!isEnabled) return;

    const timer = setInterval(() => {
      if (document.hasFocus()) {
        setSecondsLeft((prev) => {
          if (prev <= 1) {
            onRefresh();
            return interval / 1000;
          }
          return prev - 1;
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [isEnabled, interval, onRefresh]);

  const handleManualRefresh = () => {
    onRefresh();
    setSecondsLeft(interval / 1000);
  };

  const handleToggle = () => {
    setIsEnabled(!isEnabled);
    if (isEnabled) {
      setSecondsLeft(interval / 1000);
    }
  };

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = Math.floor(secondsLeft % 60);
  const progress = ((interval / 1000 - secondsLeft) / (interval / 1000)) * 100;

  return (
    <div className={styles.container}>
      <button
        className={styles.refreshButton}
        onClick={handleManualRefresh}
        aria-label="Обновить сейчас"
        title="Обновить статистику"
      >
        <span className={styles.icon}>🔄</span>
        <span className={styles.text}>Обновить</span>
      </button>

      <div className={styles.timer}>
        <button
          className={`${styles.toggleButton} ${isEnabled ? styles.toggleButton_active : ''}`}
          onClick={handleToggle}
          aria-label={isEnabled ? 'Отключить автообновление' : 'Включить автообновление'}
          title={isEnabled ? 'Отключить автообновление' : 'Включить автообновление'}
        >
          <span className={styles.toggleIcon}>{isEnabled ? '⏸' : '▶️'}</span>
        </button>

        {isEnabled && (
          <>
            <div className={styles.time}>
              <span className={styles.timeLabel}>Обновление через:</span>
              <span className={styles.timeValue}>
                {minutes}:{seconds.toString().padStart(2, '0')}
              </span>
            </div>
            <div className={styles.progressBar}>
              <div
                className={styles.progressFill}
                style={{ width: `${progress}%` }}
              />
            </div>
          </>
        )}

        {!isEnabled && (
          <div className={styles.disabled}>
            <span>Автообновление выключено</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default AutoRefresh;

