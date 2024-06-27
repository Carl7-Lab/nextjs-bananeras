import { useQuery } from 'react-query';
import axios from '@/lib/axios';
import { PaginationParams } from '@/types/paginationParams';
import { serializeQueryResult } from '@/utils/serializeQueryResult';

type Params = PaginationParams;

function listClients(params: Params) {
  return axios.get('/client', { params });
}

export function useClients({ search = '', page = 1, limit = 10 }: Params) {
  const result = useQuery(
    ['clients', search, page, limit],
    () => listClients({ search, page, limit }),
    {
      keepPreviousData: true,
    }
  );

  return serializeQueryResult(result);
}
