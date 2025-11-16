import { CSVLink } from 'react-csv';
import type { MetricsData, ChartData } from '../../type';
import styles from './ExportButtons.module.scss';
import type pdfMakeType from 'pdfmake/build/pdfmake';

let pdfMake: typeof pdfMakeType | undefined;
if (typeof window !== 'undefined') {
  import('pdfmake/build/pdfmake').then((module) => {
    pdfMake = module.default;
    import('pdfmake/build/vfs_fonts').then((fonts) => {
      if (pdfMake && fonts?.pdfMake?.vfs) {
        pdfMake.vfs = fonts.pdfMake.vfs;
      }
    }).catch(() => {});
  }).catch(() => {});
}

interface ExportButtonsProps {
  metrics: MetricsData;
  chartData: ChartData;
  period: string;
}

const ExportButtons = ({ metrics, chartData, period }: ExportButtonsProps) => {
  const csvData = [
    ['Метрика', 'Значение'],
    ['Период', period === 'today' ? 'Сегодня' : period === '7days' ? '7 дней' : '30 дней'],
    ['Всего проверено', metrics.totalChecked],
    ['Одобрено (%)', metrics.approvedPercent],
    ['Отклонено (%)', metrics.rejectedPercent],
    ['Среднее время (мин)', metrics.avgTimeMinutes],
    [''],
    ['Распределение решений'],
    ['Одобрено', chartData.decisions.approved],
    ['Отклонено', chartData.decisions.rejected],
    ['На доработку', chartData.decisions.rework],
    [''],
    ['Активность по дням'],
    ...chartData.activityByDay.labels.map((label, index) => [
      label,
      chartData.activityByDay.values[index],
    ]),
    [''],
    ['По категориям'],
    ...chartData.categories.labels.map((label, index) => [
      label,
      chartData.categories.values[index],
    ]),
  ];

  const filename = `stats_${period}_${new Date().toISOString().split('T')[0]}.csv`;

  const exportPDF = () => {
    if (!pdfMake) {
      alert('PDF библиотека ещё загружается, попробуйте через секунду');
      return;
    }

    const periodLabel =
      period === 'today' ? 'Сегодня' : period === '7days' ? '7 дней' : '30 дней';

    const docDefinition = {
      pageSize: 'A4',
      pageMargins: [40, 60, 40, 60],
      content: [
        {
          text: 'Статистика модератора',
          style: 'header',
          alignment: 'center',
          margin: [0, 0, 0, 20],
        },
        {
          text: `Период: ${periodLabel}`,
          style: 'subheader',
          alignment: 'center',
          margin: [0, 0, 0, 30],
        },
        {
          text: 'Общие метрики',
          style: 'sectionHeader',
          margin: [0, 0, 0, 10],
        },
        {
          table: {
            widths: ['*', 'auto'],
            body: [
              [
                { text: 'Метрика', style: 'tableHeader' },
                { text: 'Значение', style: 'tableHeader' },
              ],
              ['Всего проверено', metrics.totalChecked.toString()],
              ['Одобрено (%)', `${metrics.approvedPercent}%`],
              ['Отклонено (%)', `${metrics.rejectedPercent}%`],
              ['Среднее время (мин)', metrics.avgTimeMinutes.toString()],
            ],
          },
          layout: 'lightHorizontalLines',
          margin: [0, 0, 0, 20],
        },
        {
          text: 'Распределение решений',
          style: 'sectionHeader',
          margin: [0, 0, 0, 10],
        },
        {
          table: {
            widths: ['*', 'auto'],
            body: [
              [
                { text: 'Решение', style: 'tableHeader' },
                { text: 'Количество', style: 'tableHeader' },
              ],
              ['Одобрено', chartData.decisions.approved.toString()],
              ['Отклонено', chartData.decisions.rejected.toString()],
              ['На доработку', chartData.decisions.rework.toString()],
            ],
          },
          layout: 'lightHorizontalLines',
          margin: [0, 0, 0, 20],
        },
        {
          text: 'Активность по дням',
          style: 'sectionHeader',
          margin: [0, 0, 0, 10],
        },
        {
          table: {
            widths: ['*', 'auto'],
            body: [
              [
                { text: 'День', style: 'tableHeader' },
                { text: 'Проверено', style: 'tableHeader' },
              ],
              ...chartData.activityByDay.labels.map((label, index) => [
                label,
                chartData.activityByDay.values[index].toString(),
              ]),
            ],
          },
          layout: 'lightHorizontalLines',
          margin: [0, 0, 0, 20],
        },
        {
          text: 'Статистика по категориям',
          style: 'sectionHeader',
          margin: [0, 0, 0, 10],
        },
        {
          table: {
            widths: ['*', 'auto'],
            body: [
              [
                { text: 'Категория', style: 'tableHeader' },
                { text: 'Проверено', style: 'tableHeader' },
              ],
              ...chartData.categories.labels.map((label, index) => [
                label,
                chartData.categories.values[index].toString(),
              ]),
            ],
          },
          layout: 'lightHorizontalLines',
        },
      ],
      styles: {
        header: {
          fontSize: 22,
          bold: true,
          color: '#2c3e50',
        },
        subheader: {
          fontSize: 14,
          color: '#7f8c8d',
        },
        sectionHeader: {
          fontSize: 16,
          bold: true,
          color: '#34495e',
        },
        tableHeader: {
          bold: true,
          fontSize: 11,
          color: '#2c3e50',
          fillColor: '#ecf0f1',
        },
      },
      defaultStyle: {
        fontSize: 10,
        color: '#2c3e50',
      },
    };

    pdfMake.createPdf(docDefinition).download(`stats_${period}_${new Date().toISOString().split('T')[0]}.pdf`);
  };

  return (
    <div className={styles.container}>
      <CSVLink
        data={csvData}
        filename={filename}
        className={styles.button}
        aria-label="Скачать CSV"
      >
        <span className={styles.icon}>📥</span>
        <span className={styles.text}>Экспорт CSV</span>
      </CSVLink>

      <button
        className={styles.button}
        onClick={exportPDF}
        aria-label="Скачать PDF"
      >
        <span className={styles.icon}>📄</span>
        <span className={styles.text}>Экспорт PDF</span>
      </button>

      <button
        className={styles.button}
        onClick={() => window.print()}
        aria-label="Печать отчёта"
      >
        <span className={styles.icon}>🖨️</span>
        <span className={styles.text}>Печать</span>
      </button>
    </div>
  );
};

export default ExportButtons;

