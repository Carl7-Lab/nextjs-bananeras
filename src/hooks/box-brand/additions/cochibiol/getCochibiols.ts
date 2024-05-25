import { useQuery } from 'react-query';
import axios from '@/lib/axios';
import { PaginationParams } from '@/types/paginationParams';
import { serializeQueryResult } from '@/utils/serializeQueryResult';

type Params = PaginationParams;

function listCochibiols(params: Params) {
  return axios.get('/box-brand/cochibiol', { params });
}

export function useCochibiols({ search = '', page = 1, limit = 10 }: Params) {
  const result = useQuery(
    ['cochibiols', search, page, limit],
    () => listCochibiols({ search, page, limit }),
    {
      keepPreviousData: true,
    }
  );

  return serializeQueryResult(result);
}
