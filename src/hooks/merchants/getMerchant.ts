import { UseQueryResult, useQuery } from 'react-query';
import axios from '@/lib/axios';
import { QueryConfig } from '@/lib/react-query';
import { MerchantType } from '@/types/merchant';
import { serializeQueryResult } from '@/utils/serializeQueryResult';

export const getMerchant = ({ merchantId }: { merchantId: string }) => {
  return axios.get(`/merchant/${merchantId}`);
};

type QueryFnType = typeof getMerchant;

type UseMerchantOptions = {
  merchantId: string;
  config?: QueryConfig<QueryFnType>;
};

export const useMerchant = ({
  merchantId,
}: UseMerchantOptions): UseQueryResult<MerchantType> => {
  const result = useQuery(
    ['merchant', merchantId],
    () => getMerchant({ merchantId }),
    {
      keepPreviousData: true,
    }
  );

  return serializeQueryResult(result) as UseQueryResult<MerchantType>;
};
