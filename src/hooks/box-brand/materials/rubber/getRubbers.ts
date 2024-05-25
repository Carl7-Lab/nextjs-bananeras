import { useQuery } from 'react-query';
import axios from '@/lib/axios';
import { PaginationParams } from '@/types/paginationParams';
import { serializeQueryResult } from '@/utils/serializeQueryResult';

type Params = PaginationParams;

function listRubbers(params: Params) {
  return axios.get('/box-brand/rubber', { params });
}

export function useRubbers({ search = '', page = 1, limit = 10 }: Params) {
  const result = useQuery(
    ['rubbers', search, page, limit],
    () => listRubbers({ search, page, limit }),
    {
      keepPreviousData: true,
    }
  );

  return serializeQueryResult(result);
}
