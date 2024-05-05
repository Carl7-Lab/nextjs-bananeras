import { useState } from 'react';

export const usePagination = () => {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const paginationParams = { search, page, limit };
  const paginationProps = { page, setPage, limit, setLimit };
  const filterProps = { setSearch, setPage };

  return { paginationParams, paginationProps, filterProps, search };
};
