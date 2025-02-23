import { AxiosResponse } from 'axios';
import { UseQueryResult, useQuery } from 'react-query';
import axios from '@/lib/axios';
import { QueryConfig } from '@/lib/react-query';
import { serializeQueryResult } from '@/utils/serializeQueryResult';
import { MerchantType } from '../../types/merchant/merchant';

export const getMerchant = ({
  merchantId,
}: {
  merchantId: string;
}): Promise<AxiosResponse> => {
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
