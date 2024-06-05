import { useQuery } from 'react-query';
import axios from '../../lib/axios';
import { PaginationParams } from '../../types/paginationParams';
import { serializeQueryResult } from '../../utils/serializeQueryResult';

type Params = PaginationParams;

function listExportsNotSent(params: Params) {
  return axios.get('/export/not-sent', { params });
}

export function useExportsNotSent({
  search = '',
  page = 1,
  limit = 10,
}: Params) {
  const result = useQuery(
    ['exportsNotSent', search, page, limit],
    () => listExportsNotSent({ search, page, limit }),
    {
      keepPreviousData: true,
    }
  );

  return serializeQueryResult(result);
}
