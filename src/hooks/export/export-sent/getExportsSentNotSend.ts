import { useQuery } from 'react-query';
import axios from '@/lib/axios';
import { PaginationParams } from '@/types/paginationParams';
import { serializeQueryResult } from '@/utils/serializeQueryResult';

type Params = PaginationParams;

function listExportsSentNotSent(params: Params) {
  return axios.get('/export/export-sent/not-sent', { params });
}

export function useExportsSentNotSent({
  search = '',
  page = 1,
  limit = 10,
}: Params) {
  const result = useQuery(
    ['exportsSentNotSent', search, page, limit],
    () => listExportsSentNotSent({ search, page, limit }),
    {
      keepPreviousData: true,
    }
  );

  return serializeQueryResult(result);
}
