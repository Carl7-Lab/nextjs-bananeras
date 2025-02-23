import { AxiosResponse } from 'axios';
import { useQuery, UseQueryResult } from 'react-query';
import axios from '@/lib/axios';
import { QueryConfig } from '@/lib/react-query';
import { StrippingType } from '@/types/box-brand/container/stripping';
import { serializeQueryResult } from '@/utils/serializeQueryResult';

export const getStripping = ({
  strippingId,
}: {
  strippingId: string;
}): Promise<AxiosResponse> => {
  return axios.get(`/box-brand/stripping/${strippingId}`);
};

type QueryFnType = typeof getStripping;

type UseStrippingOptions = {
  strippingId: string;
  config?: QueryConfig<QueryFnType>;
};

export const useStripping = ({
  strippingId,
}: UseStrippingOptions): UseQueryResult<StrippingType> => {
  const result = useQuery(
    ['stripping', strippingId],
    () => getStripping({ strippingId }),
    {
      keepPreviousData: true,
    }
  );

  return serializeQueryResult(result) as UseQueryResult<StrippingType>;
};
