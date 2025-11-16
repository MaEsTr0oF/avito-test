import { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Announcement } from '../../type';
import { formatPrice, formatDate, getStatusLabel, truncateText } from '@/utils';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { toggleSelectAnnouncement, selectSelectedIds } from '../../slice';
import styles from './AnnouncementCard.module.scss';

interface AnnouncementCardProps {
  item: Announcement;
}

const AnnouncementCard = memo(({ item }: AnnouncementCardProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const selectedIds = useAppSelector(selectSelectedIds);
  const isSelected = selectedIds.includes(item.id);

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    dispatch(toggleSelectAnnouncement(item.id));
  };

  const handleCardClick = () => {
    navigate(`/item/${item.id}`);
  };

  return (
    <div className={`${styles.card} ${isSelected ? styles.card_selected : ''}`} onClick={handleCardClick}>
      <div className={styles.card__checkbox} onClick={(e) => e.stopPropagation()}>
        <input
          type="checkbox"
          checked={isSelected}
          onChange={handleCheckboxChange}
          aria-label={`Выбрать объявление ${item.title}`}
        />
      </div>

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
              {getStatusLabel(item.status)}
            </span>
            {item.priority === 'urgent' && (
              <span className={styles.card__priority}>
                Срочно
              </span>
            )}
          </div>
        </div>

        <p className={styles.card__description}>
          {truncateText(item.description, 120)}
        </p>

        <div className={styles.card__info}>
          <div className={styles.card__price}>
            {formatPrice(item.price)}
          </div>
          <div className={styles.card__category}>{item.category}</div>
        </div>

        <div className={styles.card__footer}>
          <span className={styles.card__date}>
            {formatDate(item.createdAt)}
          </span>
          <div className={styles.card__seller}>
            <span className={styles.card__sellerName}>{item.seller.name}</span>
            <span className={styles.card__sellerRating}>⭐ {item.seller.rating}</span>
          </div>
        </div>
      </div>
    </div>
  );
});

AnnouncementCard.displayName = 'AnnouncementCard';

export default AnnouncementCard;

