import { useQuery } from 'react-query';
import axios from '../../lib/axios';
import { PaginationParams } from '../../types/paginationParams';
import { serializeQueryResult } from '../../utils/serializeQueryResult';

type Params = PaginationParams;

function listBusinesses(params: Params) {
  return axios.get('/merchant/business', { params });
}

export function useBusinesses({ search = '', page = 1, limit = 10 }: Params) {
  const result = useQuery(
    ['businesses', search, page, limit],
    () => listBusinesses({ search, page, limit }),
    {
      keepPreviousData: true,
    }
  );

  return serializeQueryResult(result);
}
