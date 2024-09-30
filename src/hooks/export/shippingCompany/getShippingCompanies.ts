import { useQuery } from 'react-query';
import axios from '@/lib/axios';
import { PaginationParams } from '@/types/paginationParams';
import { serializeQueryResult } from '@/utils/serializeQueryResult';

type Params = PaginationParams;

function listShippingCompany(params: Params) {
  return axios
    .get('/harbor/shipping-company', { params })
    .then((response) => response.data)
    .catch((error) => {
      if (error.response?.status === 404) {
        return [];
      }
      throw error;
    });
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
