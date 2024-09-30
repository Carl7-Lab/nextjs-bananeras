import { AxiosResponse } from 'axios';
import { useQuery } from 'react-query';
import axios from '@/lib/axios';
import { PaginationParams } from '@/types/paginationParams';
import { serializeQueryResult } from '@/utils/serializeQueryResult';

type Params = PaginationParams;

interface Body {
  id: number;
}

function listBusinesses(params: Params, body: Body) {
  return axios
    .get(`/merchant/${body.id}/business`, { params })
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

export function useBusinessesByMerchantId(
  { search = '', page = 1, limit = 10 }: Params,
  { id }: Body
) {
  const result = useQuery(
    ['businesses', search, page, limit, id],
    () => listBusinesses({ search, page, limit }, { id }),
    {
      keepPreviousData: true,
    }
  );

  return serializeQueryResult(result);
}
