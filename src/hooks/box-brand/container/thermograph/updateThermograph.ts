import { useMutation } from 'react-query';
import axios from '@/lib/axios';
import { MutationConfig } from '@/lib/react-query';
import { ThermographType } from '@/types/box-brand/container/thermograph';

type updateThermographDTO = {
  data: Partial<ThermographType>;
  thermographId: string;
};

const updateThermograph = ({ data, thermographId }: updateThermographDTO) => {
  return axios.post(`/box-brand/thermograph/${thermographId}`, data);
};

type UseUpdateThermographOptions = {
  config?: MutationConfig<typeof updateThermograph>;
};

export const useUpdateThermograph = ({
  config,
}: UseUpdateThermographOptions = {}) => {
  const mutation = useMutation({
    ...config,
    mutationFn: updateThermograph,
  });

  return { ...mutation, updateThermograph: mutation.mutateAsync };
};
