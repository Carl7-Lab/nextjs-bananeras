import { useQuery } from 'react-query';
import axios from '@/lib/axios';
import { PaginationParams } from '@/types/paginationParams';
import { serializeQueryResult } from '@/utils/serializeQueryResult';

type Params = PaginationParams;

function listProtectors(params: Params) {
  return axios.get('/box-brand/protector', { params });
}

export function useProtectors({ search = '', page = 1, limit = 10 }: Params) {
  const result = useQuery(
    ['protectors', search, page, limit],
    () => listProtectors({ search, page, limit }),
    {
      keepPreviousData: true,
    }
  );

  return serializeQueryResult(result);
}
