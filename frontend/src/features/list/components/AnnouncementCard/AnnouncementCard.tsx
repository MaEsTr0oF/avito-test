import type { FC } from 'react';
import { Link } from 'react-router-dom';
import type { Announcement } from '../../type';
import styles from './AnnouncementCard.module.scss';

interface AnnouncementCardProps {
  item: Announcement;
}

const STATUS_LABELS: Record<string, string> = {
  pending: 'На модерации',
  approved: 'Одобрено',
  rejected: 'Отклонено',
  draft: 'Черновик',
};

const AnnouncementCard: FC<AnnouncementCardProps> = ({ item }) => {
  return (
    <Link to={`/item/${item.id}`} className={styles.card}>
      {item.images && item.images.length > 0 && (
        <div className={styles.card__image}>
          <img src={item.images[0]} alt={item.title} />
        </div>
      )}

      <div className={styles.card__content}>
        <div className={styles.card__header}>
          <h3 className={styles.card__title}>{item.title}</h3>
          <div className={styles.card__badges}>
            <span className={`${styles.card__status} ${styles[`card__status--${item.status}`]}`}>
              {STATUS_LABELS[item.status] || item.status}
            </span>
            {item.priority === 'urgent' && (
              <span className={styles.card__priority}>
                ⚡ Срочно
              </span>
            )}
          </div>
        </div>

        <p className={styles.card__description}>
          {item.description.length > 120
            ? `${item.description.slice(0, 120)}...`
            : item.description}
        </p>

        <div className={styles.card__info}>
          <div className={styles.card__price}>
            {item.price.toLocaleString('ru-RU')} ₽
          </div>
          <div className={styles.card__category}>{item.category}</div>
        </div>

        <div className={styles.card__footer}>
          <span className={styles.card__date}>
            {new Date(item.createdAt).toLocaleDateString('ru-RU')}
          </span>
          <div className={styles.card__seller}>
            <span className={styles.card__sellerName}>{item.seller.name}</span>
            <span className={styles.card__sellerRating}>⭐ {item.seller.rating}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default AnnouncementCard;

