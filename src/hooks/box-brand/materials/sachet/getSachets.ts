import { AxiosResponse } from 'axios';
import { useQuery } from 'react-query';
import axios from '@/lib/axios';
import { PaginationParams } from '@/types/paginationParams';
import { serializeQueryResult } from '@/utils/serializeQueryResult';

type Params = PaginationParams;

function listSachets(params: Params) {
  return axios
    .get('/box-brand/sachet', { params })
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

export function useSachets({ search = '', page = 1, limit = 10 }: Params) {
  const result = useQuery(
    ['sachets', search, page, limit],
    () => listSachets({ search, page, limit }),
    {
      keepPreviousData: true,
    }
  );

  return serializeQueryResult(result);
}
