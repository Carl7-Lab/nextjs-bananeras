import { useQuery } from 'react-query';
import axios from '@/lib/axios';
import { PaginationParams } from '@/types/paginationParams';
import { serializeQueryResult } from '@/utils/serializeQueryResult';

type Params = PaginationParams;

function listClusterBags(params: Params) {
  return axios
    .get('/box-brand/cluster-bag', { params })
    .then((response) => response.data)
    .catch((error) => {
      if (error.response?.status === 404) {
        return [];
      }
      throw error;
    });
}

export function useClusterBags({ search = '', page = 1, limit = 10 }: Params) {
  const result = useQuery(
    ['clusterBags', search, page, limit],
    () => listClusterBags({ search, page, limit }),
    {
      keepPreviousData: true,
    }
  );

  return serializeQueryResult(result);
}
