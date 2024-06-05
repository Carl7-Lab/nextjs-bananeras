import { useQuery } from 'react-query';
import axios from '@/lib/axios';
import { PaginationParams } from '@/types/paginationParams';
import { serializeQueryResult } from '@/utils/serializeQueryResult';

type Params = PaginationParams;

function listExportsSent(params: Params) {
  return axios.get('/export/export-sent', { params });
}

export function useExportsSent({ search = '', page = 1, limit = 10 }: Params) {
  const result = useQuery(
    ['exportsSent', search, page, limit],
    () => listExportsSent({ search, page, limit }),
    {
      keepPreviousData: true,
    }
  );

  return serializeQueryResult(result);
}
