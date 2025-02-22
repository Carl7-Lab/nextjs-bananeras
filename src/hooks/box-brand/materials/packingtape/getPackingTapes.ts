import { AxiosResponse } from 'axios';
import { useQuery } from 'react-query';
import axios from '@/lib/axios';
import { PaginationParams } from '@/types/paginationParams';
import { serializeQueryResult } from '@/utils/serializeQueryResult';

type Params = PaginationParams;

function listPackingTapes(params: Params) {
  return axios
    .get('/box-brand/packingtape', { params })
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

export function usePackingTapes({ search = '', page = 1, limit = 10 }: Params) {
  const result = useQuery(
    ['packingtapes', search, page, limit],
    () => listPackingTapes({ search, page, limit }),
    {
      keepPreviousData: true,
    }
  );
  return serializeQueryResult(result);
}
