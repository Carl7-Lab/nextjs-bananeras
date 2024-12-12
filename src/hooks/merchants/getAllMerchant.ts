import { useQuery } from 'react-query';
import axios from '../../lib/axios';
import { PaginationParams } from '../../types/paginationParams';
import { serializeQueryResult } from '../../utils/serializeQueryResult';

type Params = PaginationParams;

function listProducers(params: Params) {
  return axios.get('/merchant', { params });
}

export function useProducers({ search = '', page = 1, limit = 10 }: Params) {
  const result = useQuery(
    ['producers', search, page, limit],
    () => listProducers({ search, page, limit }),
    {
      keepPreviousData: true,
    }
  );

  return serializeQueryResult(result);
}
