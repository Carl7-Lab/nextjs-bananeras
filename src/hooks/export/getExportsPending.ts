import { useQuery } from 'react-query';
import axios from '../../lib/axios';
import { PaginationParams } from '../../types/paginationParams';
import { serializeQueryResult } from '../../utils/serializeQueryResult';

type Params = PaginationParams;

function listExportsPending(params: Params) {
  return axios.get('/export/pending', { params });
}

export function useExportsPending({
  search = '',
  page = 1,
  limit = 10,
}: Params) {
  const result = useQuery(
    ['exportsPending', search, page, limit],
    () => listExportsPending({ search, page, limit }),
    {
      keepPreviousData: true,
    }
  );

  return serializeQueryResult(result);
}
