import { AxiosResponse } from 'axios';
import { useQuery } from 'react-query';
import axios from '@/lib/axios';
import { PaginationParams } from '@/types/paginationParams';
import { serializeQueryResult } from '@/utils/serializeQueryResult';

type Params = PaginationParams;

function listShippingCompany(params: Params): Promise<AxiosResponse> {
  return axios
    .get('/harbor/shipping-company', { params })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      if (error.response?.status === 404) {
        return {
          data: [],
          status: 404,
          statusText: 'Not Found',
          headers: {},
          config: error.config,
        } as AxiosResponse;
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
