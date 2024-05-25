import { useQuery } from 'react-query';
import axios from '@/lib/axios';
import { PaginationParams } from '@/types/paginationParams';
import { serializeQueryResult } from '@/utils/serializeQueryResult';

type Params = PaginationParams;

function listMettoLabels(params: Params) {
  return axios.get('/box-brand/metto-label', { params });
}

export function useMettoLabels({ search = '', page = 1, limit = 10 }: Params) {
  const result = useQuery(
    ['mettoLabels', search, page, limit],
    () => listMettoLabels({ search, page, limit }),
    {
      keepPreviousData: true,
    }
  );

  return serializeQueryResult(result);
}
