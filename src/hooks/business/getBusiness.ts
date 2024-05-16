import { UseQueryResult, useQuery } from 'react-query';
import axios from '@/lib/axios';
import { QueryConfig } from '@/lib/react-query';
import { BusinessType } from '@/types/business';
import { serializeQueryResult } from '@/utils/serializeQueryResult';

export const getBusiness = ({ businessId }: { businessId: string }) => {
  return axios.get(`/merchant/business/${businessId}`);
};

type QueryFnType = typeof getBusiness;

type UseBusinessOptions = {
  businessId: string;
  config?: QueryConfig<QueryFnType>;
};

export const useBusiness = ({
  businessId,
}: UseBusinessOptions): UseQueryResult<BusinessType> => {
  const result = useQuery(
    ['business', businessId],
    () => getBusiness({ businessId }),
    {
      keepPreviousData: true,
    }
  );

  return serializeQueryResult(result) as UseQueryResult<BusinessType>;
};
