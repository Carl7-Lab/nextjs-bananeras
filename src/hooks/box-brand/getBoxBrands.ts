import { useQuery } from 'react-query';
import axios from '@/lib/axios';
import { PaginationParams } from '@/types/paginationParams';
import { serializeQueryResult } from '@/utils/serializeQueryResult';

type Params = PaginationParams;

function listBoxBrands(params: Params) {
  return axios
    .get('/box-brand', { params })
    .then((response) => response.data)
    .catch((error) => {
      if (error.response?.status === 404) {
        return [];
      }
      throw error;
    });
}

export function useBoxBrands({ search = '', page = 1, limit = 10 }: Params) {
  const result = useQuery(
    ['boxBrands', search, page, limit],
    () => listBoxBrands({ search, page, limit }),
    {
      keepPreviousData: true,
    }
  );

  return serializeQueryResult(result);
}
