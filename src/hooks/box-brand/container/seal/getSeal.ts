import { AxiosResponse } from 'axios';
import { useQuery, UseQueryResult } from 'react-query';
import axios from '@/lib/axios';
import { QueryConfig } from '@/lib/react-query';
import { SealType } from '@/types/box-brand/container/seal';
import { serializeQueryResult } from '@/utils/serializeQueryResult';

export const getSeal = ({
  sealId,
}: {
  sealId: string;
}): Promise<AxiosResponse> => {
  return axios.get(`/box-brand/seal/${sealId}`);
};

type QueryFnType = typeof getSeal;

type UseSealOptions = {
  sealId: string;
  config?: QueryConfig<QueryFnType>;
};

export const useSeal = ({
  sealId,
}: UseSealOptions): UseQueryResult<SealType> => {
  const result = useQuery(['seal', sealId], () => getSeal({ sealId }), {
    keepPreviousData: true,
  });

  return serializeQueryResult(result) as UseQueryResult<SealType>;
};
