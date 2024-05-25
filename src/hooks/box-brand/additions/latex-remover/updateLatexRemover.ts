import { useMutation } from 'react-query';
import axios from '@/lib/axios';
import { MutationConfig } from '@/lib/react-query';
import { LatexRemoverType } from '@/types/box-brand/additions/latexRemover';

type updateLatexRemoverDTO = {
  data: Partial<LatexRemoverType>;
  latexRemoverId: string;
};

const updateLatexRemover = ({
  data,
  latexRemoverId,
}: updateLatexRemoverDTO) => {
  return axios.post(`/box-brand/latex-remover/${latexRemoverId}`, data);
};

type UseUpdateLatexRemoverOptions = {
  config?: MutationConfig<typeof updateLatexRemover>;
};

export const useUpdateLatexRemover = ({
  config,
}: UseUpdateLatexRemoverOptions = {}) => {
  const mutation = useMutation({
    ...config,
    mutationFn: updateLatexRemover,
  });

  return { ...mutation, updateLatexRemover: mutation.mutateAsync };
};
