import React, { useState } from 'react';
import { useGetAnnouncementsQuery } from './services';
// import AnnouncementCard from './components/AnnouncementCard';
// import Filters from './components/Filters';
// import Pagination from './components/Pagination';
import styles from './list.module.scss';

const ListPage: React.FC = () => {
  const [page] = useState(1);
  const [limit] = useState(10);
  const [status] = useState<'pending' | 'approved' | 'rejected' | undefined>(undefined);
  const [categoryId] = useState<number | undefined>(undefined);
  const [priority] = useState<'normal' | 'urgent' | undefined>(undefined);

  const { data, isLoading, error } = useGetAnnouncementsQuery({
    page,
    limit,
    status,
    categoryId,
    priority,
  });

  const announcements = data?.ads ?? [];

  return (
    <div className={styles.container}>
      <h1>Список объявлений</h1>
      {/* <Filters 
        status={status}
        category={category}
        priority={priority}
        onStatusChange={setStatus}
        onCategoryChange={setCategory}
        onPriorityChange={setPriority}
      /> */}
      <div className={styles.cards}>
        {isLoading ? (
          <p>Загрузка...</p>
        ) : error ? (
          <p>Ошибка загрузки данных</p>
        ) : announcements.length === 0 ? (
          <p>Объявления не найдены</p>
        ) : (
          announcements.map((item) => (
            // <AnnouncementCard key={item.id} item={item} />
            <div key={item.id}>{item.title}</div>
          ))
        )}
      </div>
      {/* <Pagination 
        currentPage={data?.pagination?.currentPage ?? 1}
        totalPages={data?.pagination?.totalPages ?? 0}
        totalItems={data?.pagination?.totalItems ?? 0}
        itemsPerPage={data?.pagination?.itemsPerPage ?? limit}
        onPageChange={setPage}
      /> */}
    </div>
  );
};

export default ListPage;