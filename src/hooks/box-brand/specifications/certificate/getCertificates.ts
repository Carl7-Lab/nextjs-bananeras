import { useQuery } from 'react-query';
import axios from '@/lib/axios';
import { PaginationParams } from '@/types/paginationParams';
import { serializeQueryResult } from '@/utils/serializeQueryResult';

type Params = PaginationParams;

function listCertificates(params: Params) {
  return axios.get('/box-brand/certificate', { params });
}

export function useCertificates({ search = '', page = 1, limit = 10 }: Params) {
  const result = useQuery(
    ['certificates', search, page, limit],
    () => listCertificates({ search, page, limit }),
    {
      keepPreviousData: true,
    }
  );

  return serializeQueryResult(result);
}
