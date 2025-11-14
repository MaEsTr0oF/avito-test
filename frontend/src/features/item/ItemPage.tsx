import { useParams, useNavigate } from 'react-router-dom';
import { useGetAnnouncementByIdQuery } from './services';
import { formatPrice, formatDate, getStatusLabel } from '@/utils';
import ImageGallery from './components/ImageGallery';
import CharacteristicsTable from './components/CharacteristicsTable';
import SellerInfo from './components/SellerInfo';
import ModerationHistory from './components/ModerationHistory';
import ModerationActions from './components/ModerationActions';
import NavigationButtons from './components/NavigationButtons';
import styles from './item.module.scss';

const ItemPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const { data, isLoading, error, refetch } = useGetAnnouncementByIdQuery(Number(id), {
    skip: !id,
  });

  if (isLoading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>
          <div className={styles.spinner}></div>
          <p>Загрузка объявления...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.container}>
        <div className={styles.error}>
          <p>❌ Ошибка при загрузке объявления</p>
          <p className={styles.errorDetails}>
            Объявление не найдено или произошла ошибка сервера
          </p>
          <button className={styles.actionButton} onClick={() => navigate('/list')}>
            Вернуться к списку
          </button>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className={styles.container}>
        <div className={styles.empty}>
          <p>📭 Объявление не найдено</p>
          <button className={styles.actionButton} onClick={() => navigate('/list')}>
            Вернуться к списку
          </button>
        </div>
      </div>
    );
  }

  const announcement = data;

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'pending':
        return styles.status_pending;
      case 'approved':
        return styles.status_approved;
      case 'rejected':
        return styles.status_rejected;
      case 'draft':
        return styles.status_draft;
      default:
        return '';
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.topBar}>
        <button className={styles.backButton} onClick={() => navigate('/list')}>
          ← Назад к списку
        </button>
        <NavigationButtons currentId={announcement.id} />
      </div>

      <div className={styles.header}>
        <div className={styles.titleSection}>
          <h1 className={styles.title}>{announcement.title}</h1>
          <div className={styles.badges}>
            <span className={`${styles.status} ${getStatusClass(announcement.status)}`}>
              {getStatusLabel(announcement.status)}
            </span>
            {announcement.priority === 'urgent' && (
              <span className={styles.priority}>⚡ Срочно</span>
            )}
          </div>
        </div>
        <div className={styles.price}>{formatPrice(announcement.price)}</div>
      </div>

      <div className={styles.layout}>
        <div className={styles.mainColumn}>
          <ImageGallery images={announcement.images} alt={announcement.title} />

          <div className={styles.descriptionCard}>
            <h3 className={styles.sectionTitle}>Описание</h3>
            <p className={styles.description}>{announcement.description}</p>
            <div className={styles.metadata}>
              <span className={styles.metaItem}>
                <strong>Категория:</strong> {announcement.category}
              </span>
              <span className={styles.metaItem}>
                <strong>Дата создания:</strong>{' '}
                {formatDate(announcement.createdAt)}
              </span>
            </div>
          </div>

          <CharacteristicsTable characteristics={announcement.characteristics} />
          <SellerInfo seller={announcement.seller} />
          <ModerationHistory history={announcement.moderationHistory} />
        </div>

        <aside className={styles.sidebar}>
          <ModerationActions
            announcementId={announcement.id}
            currentStatus={announcement.status}
            onSuccess={() => refetch()}
          />
        </aside>
      </div>
    </div>
  );
};

export default ItemPage;
