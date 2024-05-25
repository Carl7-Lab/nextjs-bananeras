import { useMutation } from 'react-query';
import axios from '@/lib/axios';
import { MutationConfig } from '@/lib/react-query';
import { ProtectorType } from '@/types/box-brand/materials/protector';

type updateProtectorDTO = {
  data: Partial<ProtectorType>;
  protectorId: string;
};

const updateProtector = ({ data, protectorId }: updateProtectorDTO) => {
  return axios.post(`/box-brand/protector/${protectorId}`, data);
};

type UseUpdateProtectorOptions = {
  config?: MutationConfig<typeof updateProtector>;
};

export const useUpdateProtector = ({
  config,
}: UseUpdateProtectorOptions = {}) => {
  const mutation = useMutation({
    ...config,
    mutationFn: updateProtector,
  });

  return { ...mutation, updateProtector: mutation.mutateAsync };
};
