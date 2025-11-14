import { useAppSelector } from '@/store/hooks';
import { selectPeriod } from './slice';
import { useGetStatsQuery } from './services';
import PeriodFilter from './components/PeriodFilter';
import MetricCards from './components/MetricCards';
import Charts from './components/Charts';
import ExportButtons from './components/ExportButtons';
import AutoRefresh from './components/AutoRefresh';
import styles from './stats.module.scss';

const StatsPage = () => {
  const period = useAppSelector(selectPeriod);
  const { data, isLoading, error, refetch } = useGetStatsQuery(period);

  if (isLoading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>
          <div className={styles.spinner}></div>
          <p>Загрузка статистики...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.container}>
        <div className={styles.error}>
          <p>❌ Ошибка при загрузке статистики</p>
          <p className={styles.errorDetails}>
            Не удалось получить данные. Попробуйте обновить страницу.
          </p>
        </div>
      </div>
    );
  }

  if (!data || !data.metrics || !data.chartData) {
    return (
      <div className={styles.container}>
        <div className={styles.empty}>
          <p>📊 Данные отсутствуют</p>
          <p className={styles.emptyHint}>
            Нет данных для отображения за выбранный период
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.titleSection}>
          <h1 className={styles.title}>📊 Статистика модератора</h1>
          <p className={styles.subtitle}>
            Обзор эффективности работы и аналитика
          </p>
        </div>
        <div className={styles.controls}>
          <PeriodFilter />
          <ExportButtons
            metrics={data.metrics}
            chartData={data.chartData}
            period={period}
          />
        </div>
      </header>

      <AutoRefresh onRefresh={refetch} />

      <div className={styles.content}>
        <MetricCards metrics={data.metrics} />
        <Charts data={data.chartData} />
      </div>
    </div>
  );
};

export default StatsPage;

