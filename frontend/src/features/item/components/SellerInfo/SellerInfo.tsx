import type { Seller } from '../../type';
import { formatDate, formatRating } from '@/utils';
import styles from './SellerInfo.module.scss';

interface SellerInfoProps {
  seller: Seller;
}

const SellerInfo = ({ seller }: SellerInfoProps) => {
  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Информация о продавце</h3>
      
      <div className={styles.content}>
        <div className={styles.mainInfo}>
          <div className={styles.avatar}>
            <span className={styles.avatarIcon}>👤</span>
          </div>
          
          <div className={styles.details}>
            <div className={styles.name}>{seller.name}</div>
            <div className={styles.rating}>
              <span className={styles.ratingIcon}>⭐</span>
              <span className={styles.ratingValue}>{formatRating(seller.rating)}</span>
            </div>
          </div>
        </div>

        <div className={styles.stats}>
          <div className={styles.stat}>
            <div className={styles.statLabel}>Объявлений</div>
            <div className={styles.statValue}>{seller.totalAds}</div>
          </div>
          
          <div className={styles.stat}>
            <div className={styles.statLabel}>На платформе</div>
            <div className={styles.statValue}>{formatDate(seller.registrationDate)}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerInfo;

