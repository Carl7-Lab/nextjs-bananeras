import { AxiosResponse } from 'axios';
import { UseQueryResult, useQuery } from 'react-query';
import axios from '@/lib/axios';
import { QueryConfig } from '@/lib/react-query';
import { ShippingCompanyType } from '@/types/shippingCompany';
import { serializeQueryResult } from '@/utils/serializeQueryResult';

export const getShippingCompany = ({
  shippingCompanyId,
}: {
  shippingCompanyId: string;
}): Promise<AxiosResponse> => {
  return axios.get(`/harbor/shipping-company/${shippingCompanyId}`);
};

type QueryFnType = typeof getShippingCompany;

type UseShippingCompanyOptions = {
  shippingCompanyId: string;
  config?: QueryConfig<QueryFnType>;
};

export const useShippingCompany = ({
  shippingCompanyId,
}: UseShippingCompanyOptions): UseQueryResult<ShippingCompanyType> => {
  const result = useQuery(
    ['shipping-company', shippingCompanyId],
    () => getShippingCompany({ shippingCompanyId }),
    {
      keepPreviousData: true,
    }
  );

  return serializeQueryResult(result) as UseQueryResult<ShippingCompanyType>;
};
