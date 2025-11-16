import { type FC, useRef, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { useGetAnnouncementsQuery } from './services';
import { useDebounce } from '@/hooks/useDebounce';
import { 
  setPage, 
  resetFilters, 
  selectFilters,
  setSearch,
  setStatuses,
  setCategoryId,
  setPriority,
  setMinPrice,
  setMaxPrice,
  setSortBy,
  setSortOrder
} from './slice';
import AnnouncementCard from './components/AnnouncementCard/AnnouncementCard';
import FiltersBar, { type FiltersBarRef } from './components/FiltersBar/FiltersBar';
import FiltersSidebar from './components/FiltersSidebar/FiltersSidebar';
import BulkActions from './components/BulkActions/BulkActions';
import Pagination from './components/Pagination/Pagination';
import styles from './list.module.scss';

const ListPage: FC = () => {
  const dispatch = useAppDispatch();
  const filters = useAppSelector(selectFilters);
  const filtersBarRef = useRef<FiltersBarRef>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const isInitialMount = useRef(true);
  
  const debouncedSearch = useDebounce(filters.search, 300);

  const { data, isLoading, error, isFetching, refetch } = useGetAnnouncementsQuery({
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

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      
      const search = searchParams.get('search') || '';
      const statuses = searchParams.getAll('status') as Array<'pending' | 'approved' | 'rejected' | 'draft'>;
      const categoryId = searchParams.get('categoryId');
      const priority = searchParams.get('priority') as 'normal' | 'urgent' | null;
      const minPrice = searchParams.get('minPrice');
      const maxPrice = searchParams.get('maxPrice');
      const sortBy = searchParams.get('sortBy') as 'createdAt' | 'price' | 'priority' | null;
      const sortOrder = searchParams.get('sortOrder') as 'asc' | 'desc' | null;
      const page = searchParams.get('page');

      if (search) dispatch(setSearch(search));
      if (statuses.length > 0) dispatch(setStatuses(statuses));
      if (categoryId) dispatch(setCategoryId(Number(categoryId)));
      if (priority) dispatch(setPriority(priority));
      if (minPrice) dispatch(setMinPrice(Number(minPrice)));
      if (maxPrice) dispatch(setMaxPrice(Number(maxPrice)));
      if (sortBy) dispatch(setSortBy(sortBy));
      if (sortOrder) dispatch(setSortOrder(sortOrder));
      if (page) dispatch(setPage(Number(page)));
    }
  }, [searchParams, dispatch]);

  useEffect(() => {
    if (!isInitialMount.current) {
      const params = new URLSearchParams();

      if (filters.search) params.set('search', filters.search);
      if (filters.statuses.length > 0) {
        filters.statuses.forEach(status => params.append('status', status));
      }
      if (filters.categoryId) params.set('categoryId', String(filters.categoryId));
      if (filters.priority) params.set('priority', filters.priority);
      if (filters.minPrice) params.set('minPrice', String(filters.minPrice));
      if (filters.maxPrice) params.set('maxPrice', String(filters.maxPrice));
      if (filters.sortBy !== 'createdAt') params.set('sortBy', filters.sortBy);
      if (filters.sortOrder !== 'desc') params.set('sortOrder', filters.sortOrder);
      if (filters.page !== 1) params.set('page', String(filters.page));

      setSearchParams(params, { replace: true });
    }
  }, [filters, setSearchParams]);

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (event.key === '/') {
      const target = event.target as HTMLElement;
      if (target.isContentEditable) {
        return;
      }
      
      event.preventDefault();
      filtersBarRef.current?.focusSearch();
    }
  }, []);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <h1 className={styles.title}>Модерация объявлений</h1>
        <p className={styles.subtitle}>
          Управление и модерация объявлений на платформе
        </p>
      </header>

      <FiltersBar ref={filtersBarRef} />
      
      <BulkActions onSuccess={refetch} />

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