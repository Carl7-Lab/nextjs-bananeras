import { useQuery } from 'react-query';
import axios from '@/lib/axios';
import { PaginationParams } from '@/types/paginationParams';
import { serializeQueryResult } from '@/utils/serializeQueryResult';

type Params = PaginationParams;

function listLatexRemovers(params: Params) {
  return axios.get('/box-brand/latex-remover', { params });
}

export function useLatexRemovers({
  search = '',
  page = 1,
  limit = 10,
}: Params) {
  const result = useQuery(
    ['latexRemovers', search, page, limit],
    () => listLatexRemovers({ search, page, limit }),
    {
      keepPreviousData: true,
    }
  );

  return serializeQueryResult(result);
}
