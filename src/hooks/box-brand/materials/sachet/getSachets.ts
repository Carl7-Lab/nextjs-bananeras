import { useQuery } from 'react-query';
import axios from '@/lib/axios';
import { PaginationParams } from '@/types/paginationParams';
import { serializeQueryResult } from '@/utils/serializeQueryResult';

type Params = PaginationParams;

function listSachets(params: Params) {
  return axios.get('/box-brand/sachet', { params });
}

export function useSachets({ search = '', page = 1, limit = 10 }: Params) {
  const result = useQuery(
    ['sachets', search, page, limit],
    () => listSachets({ search, page, limit }),
    {
      keepPreviousData: true,
    }
  );

  return serializeQueryResult(result);
}
