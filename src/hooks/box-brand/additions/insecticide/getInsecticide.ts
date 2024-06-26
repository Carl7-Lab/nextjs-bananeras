import { useQuery, UseQueryResult } from 'react-query';
import axios from '@/lib/axios';
import { QueryConfig } from '@/lib/react-query';
import { InsecticideType } from '@/types/box-brand/additions/insecticide';
import { serializeQueryResult } from '@/utils/serializeQueryResult';

export const getInsecticide = ({
  InsecticideId,
}: {
  InsecticideId: string;
}) => {
  return axios.get(`/box-brand/Insecticide/${InsecticideId}`);
};

type QueryFnType = typeof getInsecticide;

type UseInsecticideOptions = {
  InsecticideId: string;
  config?: QueryConfig<QueryFnType>;
};

export const useInsecticide = ({
  InsecticideId,
}: UseInsecticideOptions): UseQueryResult<InsecticideType> => {
  const result = useQuery(
    ['Insecticide', InsecticideId],
    () => getInsecticide({ InsecticideId }),
    {
      keepPreviousData: true,
    }
  );

  return serializeQueryResult(result) as UseQueryResult<InsecticideType>;
};
