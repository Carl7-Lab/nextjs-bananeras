import { useQuery, UseQueryResult } from 'react-query';
import axios from '@/lib/axios';
import { QueryConfig } from '@/lib/react-query';
import { LabelType } from '@/types/box-brand/materials/label';
import { serializeQueryResult } from '@/utils/serializeQueryResult';

export const getLabel = ({ labelId }: { labelId: string }) => {
  return axios.get(`/box-brand/label/${labelId}`);
};

type QueryFnType = typeof getLabel;

type UseLabelOptions = {
  labelId: string;
  config?: QueryConfig<QueryFnType>;
};

export const useLabel = ({
  labelId,
}: UseLabelOptions): UseQueryResult<LabelType> => {
  const result = useQuery(['label', labelId], () => getLabel({ labelId }), {
    keepPreviousData: true,
  });

  return serializeQueryResult(result) as UseQueryResult<LabelType>;
};
