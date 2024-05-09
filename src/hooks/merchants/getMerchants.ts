import { useQuery } from 'react-query';
import axios from '@/lib/axios';
import { PaginationParams } from '@/types/paginationParams';
import { serializeQueryResult } from '@/utils/serializeQueryResult';

type Params = PaginationParams;

function listMerchants(params: Params) {
  return axios.get('/merchant', { params });
}

export function useMerchants({ search = '', page = 1, limit = 10 }: Params) {
  const result = useQuery(
    ['merchants', search, page, limit],
    () => listMerchants({ search, page, limit }),
    {
      keepPreviousData: true,
    }
  );

  return serializeQueryResult(result);
}
