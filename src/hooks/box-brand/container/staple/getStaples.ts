import { useQuery } from 'react-query';
import axios from '@/lib/axios';
import { PaginationParams } from '@/types/paginationParams';
import { serializeQueryResult } from '@/utils/serializeQueryResult';

type Params = PaginationParams;

function listStaples(params: Params) {
  return axios.get('/box-brand/staple', { params });
}

export function useStaples({ search = '', page = 1, limit = 10 }: Params) {
  const result = useQuery(
    ['staples', search, page, limit],
    () => listStaples({ search, page, limit }),
    {
      keepPreviousData: true,
    }
  );

  return serializeQueryResult(result);
}
