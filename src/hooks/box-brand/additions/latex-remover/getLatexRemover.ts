import { useQuery, UseQueryResult } from 'react-query';
import axios from '@/lib/axios';
import { QueryConfig } from '@/lib/react-query';
import { serializeQueryResult } from '@/utils/serializeQueryResult';
import { LatexRemoverType } from '../../../../types/box-brand/additions/latexRemover';

export const getLatexRemover = ({
  latexRemoverId,
}: {
  latexRemoverId: string;
}) => {
  return axios.get(`/box-brand/latex-remover/${latexRemoverId}`);
};

type QueryFnType = typeof getLatexRemover;

type UseLatexRemoverOptions = {
  latexRemoverId: string;
  config?: QueryConfig<QueryFnType>;
};

export const useLatexRemover = ({
  latexRemoverId,
}: UseLatexRemoverOptions): UseQueryResult<LatexRemoverType> => {
  const result = useQuery(
    ['latexRemover', latexRemoverId],
    () => getLatexRemover({ latexRemoverId }),
    {
      keepPreviousData: true,
    }
  );

  return serializeQueryResult(result) as UseQueryResult<LatexRemoverType>;
};
