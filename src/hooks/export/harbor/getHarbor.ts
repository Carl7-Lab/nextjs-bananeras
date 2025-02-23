import { AxiosResponse } from 'axios';
import { UseQueryResult, useQuery } from 'react-query';
import axios from '@/lib/axios';
import { QueryConfig } from '@/lib/react-query';
import { HarborType } from '@/types/harbor';
import { serializeQueryResult } from '@/utils/serializeQueryResult';

export const getHarbor = ({
  harborId,
}: {
  harborId: string;
}): Promise<AxiosResponse> => {
  return axios.get(`/harbor/${harborId}`);
};

type QueryFnType = typeof getHarbor;

type UseHarborOptions = {
  harborId: string;
  config?: QueryConfig<QueryFnType>;
};

export const useHarbor = ({
  harborId,
}: UseHarborOptions): UseQueryResult<HarborType> => {
  const result = useQuery(['harbor', harborId], () => getHarbor({ harborId }), {
    keepPreviousData: true,
  });

  return serializeQueryResult(result) as UseQueryResult<HarborType>;
};
