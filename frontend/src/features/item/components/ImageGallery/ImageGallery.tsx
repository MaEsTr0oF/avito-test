import { useState, useEffect, useCallback } from 'react';
import styles from './ImageGallery.module.scss';

interface ImageGalleryProps {
  images: string[];
  alt?: string;
}

const ImageGallery = ({ images, alt = 'Изображение товара' }: ImageGalleryProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  }, [images.length]);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  }, [images.length]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        goToPrevious();
      } else if (e.key === 'ArrowRight') {
        goToNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goToPrevious, goToNext]);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 75) {
      goToNext();
    }

    if (touchStart - touchEnd < -75) {
      goToPrevious();
    }
  };

  if (!images || images.length === 0) {
    return (
      <div className={styles.gallery}>
        <div className={styles.placeholder}>
          <p>📷 Нет изображений</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.gallery}>
      <div className={styles.mainImage}>
        <button
          className={`${styles.navButton} ${styles.navButton_prev}`}
          onClick={goToPrevious}
          aria-label="Предыдущее изображение"
          disabled={images.length === 1}
        >
          <span className={styles.arrow}>‹</span>
        </button>

        <div
          className={styles.imageContainer}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <img
            src={images[currentIndex] || '/assets/placeholder.jpg'}
            alt={`${alt} ${currentIndex + 1}`}
            className={styles.image}
          />
        </div>

        <button
          className={`${styles.navButton} ${styles.navButton_next}`}
          onClick={goToNext}
          aria-label="Следующее изображение"
          disabled={images.length === 1}
        >
          <span className={styles.arrow}>›</span>
        </button>

        {images.length > 1 && (
          <div className={styles.counter}>
            {currentIndex + 1} / {images.length}
          </div>
        )}
      </div>

      {images.length > 1 && (
        <div className={styles.thumbnails}>
          {images.map((image, index) => (
            <button
              key={index}
              className={`${styles.thumbnail} ${
                index === currentIndex ? styles.thumbnail_active : ''
              }`}
              onClick={() => goToSlide(index)}
              aria-label={`Перейти к изображению ${index + 1}`}
            >
              <img
                src={image || '/assets/placeholder.jpg'}
                alt={`Миниатюра ${index + 1}`}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageGallery;

