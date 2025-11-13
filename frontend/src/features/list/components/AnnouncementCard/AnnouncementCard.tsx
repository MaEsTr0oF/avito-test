import React from 'react';
import type { Announcement } from '../../type';
import styles from './AnnouncementCard.module.scss';

interface AnnouncementCardProps {
  item: Announcement;
}

const AnnouncementCard: React.FC<AnnouncementCardProps> = ({ item }) => {
  return (
    <div className={styles.card}>
      <div className={styles.card__header}>
        <h3 className={styles.card__title}>{item.title}</h3>
        <span className={`${styles.card__status} ${styles[`card__status--${item.status}`]}`}>
          {item.status}
        </span>
        {item.priority === 'urgent' && (
          <span className={`${styles.card__priority} ${styles[`card__priority--${item.priority}`]}`}>
            Срочно
          </span>
        )}
      </div>
      
      <p className={styles.card__description}>{item.description}</p>
      
      <div className={styles.card__price}>
        {item.price.toLocaleString('ru-RU')} ₽
      </div>
      
      <div className={styles.card__category}>
        {item.category}
      </div>
      
      {item.images && item.images.length > 0 && (
        <div className={styles.card__images}>
          {item.images.slice(0, 3).map((image, index) => (
            <img key={index} src={image} alt={`${item.title} ${index + 1}`} />
          ))}
        </div>
      )}
      
      <div className={styles.card__seller}>
        <span className={styles['card__seller-name']}>{item.seller.name}</span>
        <span className={styles['card__seller-rating']}>⭐ {item.seller.rating}</span>
      </div>
    </div>
  );
};

export default AnnouncementCard;

