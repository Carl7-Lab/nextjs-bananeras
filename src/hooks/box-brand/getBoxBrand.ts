import { useQuery, UseQueryResult } from 'react-query';
import axios from '@/lib/axios';
import { QueryConfig } from '@/lib/react-query';
import { BoxBrandType } from '@/types/box-brand/boxBrand';
import { serializeQueryResult } from '@/utils/serializeQueryResult';

export const getBoxBrand = ({ boxBrandId }: { boxBrandId: string }) => {
  return axios.get(`/box-brand/${boxBrandId}`);
};

type QueryFnType = typeof getBoxBrand;

type UseBoxBrandOptions = {
  boxBrandId: string;
  config?: QueryConfig<QueryFnType>;
};

export const useBoxBrand = ({
  boxBrandId,
}: UseBoxBrandOptions): UseQueryResult<BoxBrandType> => {
  const result = useQuery(
    ['boxBrand', boxBrandId],
    () => getBoxBrand({ boxBrandId }),
    {
      keepPreviousData: true,
    }
  );

  return serializeQueryResult(result) as UseQueryResult<BoxBrandType>;
};
