import { memo } from 'react';
import { motion } from 'framer-motion';
import type { MetricsData } from '../../type';
import styles from './MetricCards.module.scss';

interface MetricCardsProps {
  metrics: MetricsData;
}

const MetricCards = memo(({ metrics }: MetricCardsProps) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring' as const,
        stiffness: 100,
        damping: 15,
      },
    },
  };

  return (
    <motion.div
      className={styles.grid}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div className={`${styles.card} ${styles.card_primary}`} variants={cardVariants}>
        <div className={styles.icon}>📊</div>
        <div className={styles.content}>
          <h3 className={styles.title}>Всего проверено</h3>
          <motion.p
            className={styles.value}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring' as const, stiffness: 200 }}
          >
            {metrics.totalChecked}
          </motion.p>
          <p className={styles.subtitle}>объявлений</p>
        </div>
      </motion.div>

      <motion.div className={`${styles.card} ${styles.card_success}`} variants={cardVariants}>
        <div className={styles.icon}>✅</div>
        <div className={styles.content}>
          <h3 className={styles.title}>Одобрено</h3>
          <motion.p
            className={styles.value}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: 'spring' as const, stiffness: 200 }}
          >
            {metrics.approvedPercent}%
          </motion.p>
          <p className={styles.subtitle}>от общего числа</p>
        </div>
      </motion.div>

      <motion.div className={`${styles.card} ${styles.card_error}`} variants={cardVariants}>
        <div className={styles.icon}>❌</div>
        <div className={styles.content}>
          <h3 className={styles.title}>Отклонено</h3>
          <motion.p
            className={styles.value}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.4, type: 'spring' as const, stiffness: 200 }}
          >
            {metrics.rejectedPercent}%
          </motion.p>
          <p className={styles.subtitle}>от общего числа</p>
        </div>
      </motion.div>

      <motion.div className={`${styles.card} ${styles.card_info}`} variants={cardVariants}>
        <div className={styles.icon}>⏱️</div>
        <div className={styles.content}>
          <h3 className={styles.title}>Среднее время</h3>
          <motion.p
            className={styles.value}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, type: 'spring' as const, stiffness: 200 }}
          >
            {metrics.avgTimeMinutes}
          </motion.p>
          <p className={styles.subtitle}>минут на проверку</p>
        </div>
      </motion.div>
    </motion.div>
  );
});

MetricCards.displayName = 'MetricCards';

export default MetricCards;

