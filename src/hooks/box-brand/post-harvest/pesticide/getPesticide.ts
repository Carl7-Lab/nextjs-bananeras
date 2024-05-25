import { useQuery, UseQueryResult } from 'react-query';
import axios from '@/lib/axios';
import { QueryConfig } from '@/lib/react-query';
import { PesticideType } from '@/types/box-brand/post-harvest/pesticide';
import { serializeQueryResult } from '@/utils/serializeQueryResult';

export const getPesticide = ({ pesticideId }: { pesticideId: string }) => {
  return axios.get(`/box-brand/pesticide/${pesticideId}`);
};

type QueryFnType = typeof getPesticide;

type UsePesticideOptions = {
  pesticideId: string;
  config?: QueryConfig<QueryFnType>;
};

export const usePesticide = ({
  pesticideId,
}: UsePesticideOptions): UseQueryResult<PesticideType> => {
  const result = useQuery(
    ['pesticide', pesticideId],
    () => getPesticide({ pesticideId }),
    {
      keepPreviousData: true,
    }
  );

  return serializeQueryResult(result) as UseQueryResult<PesticideType>;
};
