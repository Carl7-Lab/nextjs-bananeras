import { useQuery, UseQueryResult } from 'react-query';
import axios from '@/lib/axios';
import { QueryConfig } from '@/lib/react-query';
import { ThermographType } from '@/types/box-brand/container/thermograph';
import { serializeQueryResult } from '@/utils/serializeQueryResult';

export const getThermograph = ({
  thermographId,
}: {
  thermographId: string;
}) => {
  return axios.get(`/box-brand/thermograph/${thermographId}`);
};

type QueryFnType = typeof getThermograph;

type UseThermographOptions = {
  thermographId: string;
  config?: QueryConfig<QueryFnType>;
};

export const useThermograph = ({
  thermographId,
}: UseThermographOptions): UseQueryResult<ThermographType> => {
  const result = useQuery(
    ['thermograph', thermographId],
    () => getThermograph({ thermographId }),
    {
      keepPreviousData: true,
    }
  );

  return serializeQueryResult(result) as UseQueryResult<ThermographType>;
};
