import { useQuery } from 'react-query';
import axios from '@/lib/axios';
import { PaginationParams } from '@/types/paginationParams';
import { serializeQueryResult } from '@/utils/serializeQueryResult';

type Params = PaginationParams;

function listLabels(params: Params) {
  return axios.get('/box-brand/label', { params });
}

export function useLabels({ search = '', page = 1, limit = 10 }: Params) {
  const result = useQuery(
    ['labels', search, page, limit],
    () => listLabels({ search, page, limit }),
    {
      keepPreviousData: true,
    }
  );

  return serializeQueryResult(result);
}
