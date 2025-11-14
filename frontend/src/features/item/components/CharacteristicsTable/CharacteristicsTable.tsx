import styles from './CharacteristicsTable.module.scss';

interface CharacteristicsTableProps {
  characteristics: Record<string, string>;
}

const CharacteristicsTable = ({ characteristics }: CharacteristicsTableProps) => {
  const entries = Object.entries(characteristics);

  if (entries.length === 0) {
    return (
      <div className={styles.empty}>
        <p>📋 Нет характеристик</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Характеристики</h3>
      <table className={styles.table}>
        <tbody>
          {entries.map(([key, value]) => (
            <tr key={key} className={styles.row}>
              <td className={styles.key}>{key}</td>
              <td className={styles.value}>{value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CharacteristicsTable;

