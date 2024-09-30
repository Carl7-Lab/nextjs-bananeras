import { useQuery } from 'react-query';
import axios from '@/lib/axios';
import { PaginationParams } from '@/types/paginationParams';
import { serializeQueryResult } from '@/utils/serializeQueryResult';

type Params = PaginationParams;

function listCuttingSheetsPending(params: Params) {
  return axios
    .get('/export/cutting-sheet/pending', { params })
    .then((response) => response.data)
    .catch((error) => {
      if (error.response?.status === 404) {
        return [];
      }
      throw error;
    });
}

export function useCuttingSheetsPending({
  search = '',
  page = 1,
  limit = 10,
}: Params) {
  const result = useQuery(
    ['cuttingSheetsPending', search, page, limit],
    () => listCuttingSheetsPending({ search, page, limit }),
    {
      keepPreviousData: true,
    }
  );

  return serializeQueryResult(result);
}
