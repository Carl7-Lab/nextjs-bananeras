import { useQuery, UseQueryResult } from 'react-query';
import axios from '@/lib/axios';
import { QueryConfig } from '@/lib/react-query';
import { serializeQueryResult } from '@/utils/serializeQueryResult';
import { BrandType } from '../../types/brand';

export const getBrand = ({ brandId }: { brandId: string }) => {
  return axios.get(`/box-brand/brand/${brandId}`);
};

type QueryFnType = typeof getBrand;

type UseBrandOptions = {
  brandId: string;
  config?: QueryConfig<QueryFnType>;
};

export const useBrand = ({
  brandId,
}: UseBrandOptions): UseQueryResult<BrandType> => {
  const result = useQuery(['brand', brandId], () => getBrand({ brandId }), {
    keepPreviousData: true,
  });

  return serializeQueryResult(result) as UseQueryResult<BrandType>;
};
