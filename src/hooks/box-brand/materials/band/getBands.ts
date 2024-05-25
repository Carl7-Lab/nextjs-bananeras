import { useQuery } from 'react-query';
import axios from '@/lib/axios';
import { PaginationParams } from '@/types/paginationParams';
import { serializeQueryResult } from '@/utils/serializeQueryResult';

type Params = PaginationParams;

function listBands(params: Params) {
  return axios.get('/box-brand/band', { params });
}

export function useBands({ search = '', page = 1, limit = 10 }: Params) {
  const result = useQuery(
    ['bands', search, page, limit],
    () => listBands({ search, page, limit }),
    {
      keepPreviousData: true,
    }
  );

  return serializeQueryResult(result);
}
