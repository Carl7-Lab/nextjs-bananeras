import { useQuery } from 'react-query';
import axios from '@/lib/axios';
import { PaginationParams } from '@/types/paginationParams';
import { serializeQueryResult } from '@/utils/serializeQueryResult';

type Params = PaginationParams;

function listShippingCompany(params: Params) {
  return axios.get('/harbor/shipping-company', { params });
}

export function useShippingCompanies({
  search = '',
  page = 1,
  limit = 10,
}: Params) {
  const result = useQuery(
    ['shipping-companies', search, page, limit],
    () => listShippingCompany({ search, page, limit }),
    {
      keepPreviousData: true,
    }
  );

  return serializeQueryResult(result);
}
