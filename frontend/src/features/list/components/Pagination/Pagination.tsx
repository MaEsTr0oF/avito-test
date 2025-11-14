import { memo } from 'react';
import styles from './Pagination.module.scss';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
}

const Pagination = memo(({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  onPageChange,
}) => {
  const startItem = totalItems === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      }
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handleFirst = () => {
    if (currentPage !== 1) {
      onPageChange(1);
    }
  };

  const handleLast = () => {
    if (currentPage !== totalPages) {
      onPageChange(totalPages);
    }
  };

  if (totalPages === 0) {
    return null;
  }

  return (
    <div className={styles.pagination}>
      <div className={styles.pagination__info}>
        Показано {startItem}–{endItem} из {totalItems} объявлений
      </div>

      <div className={styles.pagination__controls}>
        <button
          className={styles.pagination__button}
          onClick={handleFirst}
          disabled={currentPage === 1}
          aria-label="Первая страница"
          title="Первая страница"
        >
          «
        </button>

        <button
          className={styles.pagination__button}
          onClick={handlePrevious}
          disabled={currentPage === 1}
          aria-label="Предыдущая страница"
          title="Предыдущая страница"
        >
          ‹
        </button>

        <div className={styles.pagination__pages}>
          {pageNumbers.map((page, index) => {
            if (page === '...') {
              return (
                <span key={`ellipsis-${index}`} className={styles.pagination__ellipsis}>
                  …
                </span>
              );
            }

            return (
              <button
                key={page}
                className={`${styles.pagination__page} ${
                  currentPage === page ? styles['pagination__page--active'] : ''
                }`}
                onClick={() => onPageChange(page as number)}
              >
                {page}
              </button>
            );
          })}
        </div>

        <button
          className={styles.pagination__button}
          onClick={handleNext}
          disabled={currentPage === totalPages}
          aria-label="Следующая страница"
          title="Следующая страница"
        >
          ›
        </button>

        <button
          className={styles.pagination__button}
          onClick={handleLast}
          disabled={currentPage === totalPages}
          aria-label="Последняя страница"
          title="Последняя страница"
        >
          »
        </button>
      </div>
    </div>
  );
});

Pagination.displayName = 'Pagination';

export default Pagination;

