import { useQuery, UseQueryResult } from 'react-query';
import axios from '@/lib/axios';
import { QueryConfig } from '@/lib/react-query';
import { CochibiolType } from '@/types/box-brand/additions/cochibiol';
import { serializeQueryResult } from '@/utils/serializeQueryResult';

export const getCochibiol = ({ cochibiolId }: { cochibiolId: string }) => {
  return axios.get(`/box-brand/cochibiol/${cochibiolId}`);
};

type QueryFnType = typeof getCochibiol;

type UseCochibiolOptions = {
  cochibiolId: string;
  config?: QueryConfig<QueryFnType>;
};

export const useCochibiol = ({
  cochibiolId,
}: UseCochibiolOptions): UseQueryResult<CochibiolType> => {
  const result = useQuery(
    ['cochibiol', cochibiolId],
    () => getCochibiol({ cochibiolId }),
    {
      keepPreviousData: true,
    }
  );

  return serializeQueryResult(result) as UseQueryResult<CochibiolType>;
};
