/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { AxiosResponse } from 'axios';
import { useQuery } from 'react-query';
import axios from '@/lib/axios';
import { PaginationParams } from '@/types/paginationParams';
import { serializeQueryResult } from '@/utils/serializeQueryResult';

type Params = PaginationParams;

function listLids(params: Params): Promise<AxiosResponse> {
  return axios
    .get('/box-brand/lid', { params })
    .then((response) => response)
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

export function useLids({ search = '', page = 1, limit = 10 }: Params) {
  const result = useQuery(
    ['lids', search, page, limit],
    () => listLids({ search, page, limit }),
    {
      keepPreviousData: true,
    }
  );
  return serializeQueryResult(result);
}
