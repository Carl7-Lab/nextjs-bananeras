import { useQuery } from 'react-query';
import axios from '@/lib/axios';
import { PaginationParams } from '@/types/paginationParams';
import { serializeQueryResult } from '@/utils/serializeQueryResult';

type Params = PaginationParams;

function listHarbors(params: Params) {
  return axios.get('/harbor', { params });
}

export function useHarbors({ search = '', page = 1, limit = 10 }: Params) {
  const result = useQuery(
    ['harbors', search, page, limit],
    () => listHarbors({ search, page, limit }),
    {
      keepPreviousData: true,
    }
  );

  return serializeQueryResult(result);
}
