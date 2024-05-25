import { useQuery } from 'react-query';
import axios from '@/lib/axios';
import { PaginationParams } from '@/types/paginationParams';
import { serializeQueryResult } from '@/utils/serializeQueryResult';

type Params = PaginationParams;

function listThermographs(params: Params) {
  return axios.get('/box-brand/thermograph', { params });
}

export function useThermographs({ search = '', page = 1, limit = 10 }: Params) {
  const result = useQuery(
    ['thermographs', search, page, limit],
    () => listThermographs({ search, page, limit }),
    {
      keepPreviousData: true,
    }
  );

  return serializeQueryResult(result);
}
