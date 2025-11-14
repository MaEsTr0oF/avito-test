import type { FC } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { useGetAnnouncementsQuery } from './services';
import { useDebounce } from '@/hooks/useDebounce';
import { setPage, resetFilters, selectFilters } from './slice';
import AnnouncementCard from './components/AnnouncementCard/AnnouncementCard';
import FiltersBar from './components/FiltersBar/FiltersBar';
import FiltersSidebar from './components/FiltersSidebar/FiltersSidebar';
import Pagination from './components/Pagination/Pagination';
import styles from './list.module.scss';

const ListPage: FC = () => {
  const dispatch = useAppDispatch();
  const filters = useAppSelector(selectFilters);
  
  const debouncedSearch = useDebounce(filters.search, 300);

  const { data, isLoading, error, isFetching } = useGetAnnouncementsQuery({
    page: filters.page,
    limit: filters.limit,
    status: filters.statuses.length > 0 ? filters.statuses : undefined,
    categoryId: filters.categoryId,
    priority: filters.priority,
    minPrice: filters.minPrice,
    maxPrice: filters.maxPrice,
    search: debouncedSearch,
    sortBy: filters.sortBy,
    sortOrder: filters.sortOrder,
  });

  const announcements = data?.ads ?? [];
  const pagination = data?.pagination;

  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <h1 className={styles.title}>Модерация объявлений</h1>
        <p className={styles.subtitle}>
          Управление и модерация объявлений на платформе
        </p>
      </header>

      <FiltersBar />

      {isFetching && !isLoading && (
        <div className={styles.fetchingIndicator}>
          Обновление данных...
        </div>
      )}

      <div className={styles.layout}>
        <FiltersSidebar />

        <main className={styles.main}>
          {isLoading ? (
            <div className={styles.loading}>
              <div className={styles.spinner}></div>
              <p>Загрузка объявлений...</p>
            </div>
          ) : error ? (
            <div className={styles.error}>
              <p>❌ Ошибка при загрузке данных</p>
              <p className={styles.errorDetails}>
                Попробуйте обновить страницу или проверьте подключение к серверу
              </p>
            </div>
          ) : announcements.length === 0 ? (
            <div className={styles.empty}>
              <p>📭 Объявления не найдены</p>
              <p className={styles.emptyHint}>
                Попробуйте изменить параметры фильтрации
              </p>
              <button className={styles.resetButton} onClick={() => dispatch(resetFilters())}>
                Сбросить фильтры
              </button>
            </div>
          ) : (
            <>
              <div className={styles.cards}>
                {announcements.map((item) => (
                  <AnnouncementCard key={item.id} item={item} />
                ))}
              </div>

              {pagination && (
                <Pagination
                  currentPage={pagination.currentPage}
                  totalPages={pagination.totalPages}
                  totalItems={pagination.totalItems}
                  itemsPerPage={pagination.itemsPerPage}
                  onPageChange={(page) => dispatch(setPage(page))}
                />
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default ListPage;