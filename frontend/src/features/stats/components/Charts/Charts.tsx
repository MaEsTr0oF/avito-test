import { memo, useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar, Pie } from 'react-chartjs-2';
import type { ChartData } from '../../type';
import styles from './Charts.module.scss';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

interface ChartsProps {
  data: ChartData;
}

const Charts = memo(({ data }: ChartsProps) => {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 768);
      setIsTablet(window.innerWidth > 768 && window.innerWidth <= 1024);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);
  const activityData = {
    labels: data.activityByDay.labels,
    datasets: [
      {
        label: 'Проверено объявлений',
        data: data.activityByDay.values,
        backgroundColor: 'rgba(0, 123, 255, 0.7)',
        borderColor: 'rgba(0, 123, 255, 1)',
        borderWidth: 2,
        borderRadius: 6,
      },
    ],
  };

  const isTestEnv = import.meta.env.MODE === 'test' || process.env.NODE_ENV === 'test';
  
  const activityOptions = {
    responsive: !isTestEnv,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top' as const,
        labels: {
          font: {
            size: isMobile ? 11 : isTablet ? 12 : 14,
            weight: '600' as const,
          },
          padding: isMobile ? 8 : isTablet ? 12 : 16,
          boxWidth: isMobile ? 30 : 40,
        },
      },
      title: {
        display: true,
        text: isMobile ? 'Активность по дням' : 'Активность модерации по дням',
        font: {
          size: isMobile ? 14 : isTablet ? 16 : 18,
          weight: 'bold' as const,
        },
        padding: {
          top: isMobile ? 5 : 10,
          bottom: isMobile ? 10 : isTablet ? 15 : 20,
        },
      },
      tooltip: {
        titleFont: {
          size: isMobile ? 11 : 13,
        },
        bodyFont: {
          size: isMobile ? 10 : 12,
        },
        padding: isMobile ? 8 : 12,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          precision: 0,
          font: {
            size: isMobile ? 10 : 12,
          },
        },
      },
      x: {
        ticks: {
          font: {
            size: isMobile ? 10 : 12,
          },
        },
      },
    },
  };

  const decisionsData = {
    labels: ['Одобрено', 'Отклонено', 'На доработку'],
    datasets: [
      {
        data: [
          data.decisions.approved,
          data.decisions.rejected,
          data.decisions.rework,
        ],
        backgroundColor: [
          'rgba(76, 175, 80, 0.8)',
          'rgba(244, 67, 54, 0.8)',
          'rgba(255, 152, 0, 0.8)',
        ],
        borderColor: [
          'rgba(76, 175, 80, 1)',
          'rgba(244, 67, 54, 1)',
          'rgba(255, 152, 0, 1)',
        ],
        borderWidth: 2,
      },
    ],
  };

  const decisionsOptions = {
    responsive: !isTestEnv,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: (isMobile ? 'bottom' : 'right') as const,
        labels: {
          font: {
            size: isMobile ? 11 : isTablet ? 12 : 14,
            weight: '600' as const,
          },
          padding: isMobile ? 8 : isTablet ? 12 : 16,
          boxWidth: isMobile ? 30 : 40,
        },
      },
      title: {
        display: true,
        text: isMobile ? 'Решения' : 'Распределение решений',
        font: {
          size: isMobile ? 14 : isTablet ? 16 : 18,
          weight: 'bold' as const,
        },
        padding: {
          top: isMobile ? 5 : 10,
          bottom: isMobile ? 10 : isTablet ? 15 : 20,
        },
      },
      tooltip: {
        titleFont: {
          size: isMobile ? 11 : 13,
        },
        bodyFont: {
          size: isMobile ? 10 : 12,
        },
        padding: isMobile ? 8 : 12,
      },
    },
  };

  const categoriesData = {
    labels: data.categories.labels,
    datasets: [
      {
        label: 'Количество объявлений',
        data: data.categories.values,
        backgroundColor: 'rgba(103, 58, 183, 0.7)',
        borderColor: 'rgba(103, 58, 183, 1)',
        borderWidth: 2,
        borderRadius: 6,
      },
    ],
  };

  const categoriesOptions = {
    responsive: !isTestEnv,
    maintainAspectRatio: false,
    indexAxis: 'y' as const,
    plugins: {
      legend: {
        display: true,
        position: 'top' as const,
        labels: {
          font: {
            size: isMobile ? 11 : isTablet ? 12 : 14,
            weight: '600' as const,
          },
          padding: isMobile ? 8 : isTablet ? 12 : 16,
          boxWidth: isMobile ? 30 : 40,
        },
      },
      title: {
        display: true,
        text: isMobile ? 'По категориям' : 'Объявления по категориям',
        font: {
          size: isMobile ? 14 : isTablet ? 16 : 18,
          weight: 'bold' as const,
        },
        padding: {
          top: isMobile ? 5 : 10,
          bottom: isMobile ? 10 : isTablet ? 15 : 20,
        },
      },
      tooltip: {
        titleFont: {
          size: isMobile ? 11 : 13,
        },
        bodyFont: {
          size: isMobile ? 10 : 12,
        },
        padding: isMobile ? 8 : 12,
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        ticks: {
          precision: 0,
          font: {
            size: isMobile ? 10 : 12,
          },
        },
      },
      y: {
        ticks: {
          font: {
            size: isMobile ? 10 : 12,
          },
        },
      },
    },
  };

  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  const chartVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15,
      },
    },
  };

  return (
    <motion.div
      ref={containerRef}
      className={styles.container}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className={styles.chartWrapper}
        variants={chartVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        transition={{ delay: 0.2 }}
      >
        <Bar data={activityData} options={activityOptions} />
      </motion.div>

      <div className={styles.chartsRow}>
        <motion.div
          className={styles.chartWrapper}
          variants={chartVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          transition={{ delay: 0.4 }}
        >
          <Pie data={decisionsData} options={decisionsOptions} />
        </motion.div>

        <motion.div
          className={styles.chartWrapper}
          variants={chartVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          transition={{ delay: 0.6 }}
        >
          <Bar data={categoriesData} options={categoriesOptions} />
        </motion.div>
      </div>
    </motion.div>
  );
});

Charts.displayName = 'Charts';

export default Charts;

