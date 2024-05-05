import { useMutation } from 'react-query';
import axios from '@/lib/axios';
import { MutationConfig } from '@/lib/react-query';
import { BoxBrandType } from '@/types/boxBrand';

type updateBoxBrandDTO = {
  data: Partial<BoxBrandType>;
  boxBrandId: string;
};

const updateBoxBrand = ({ data, boxBrandId }: updateBoxBrandDTO) => {
  return axios.post(`/box-brand/${boxBrandId}`, data);
};

type UseUpdateBoxBrandOptions = {
  config?: MutationConfig<typeof updateBoxBrand>;
};

export const useUpdateBoxBrand = ({
  config,
}: UseUpdateBoxBrandOptions = {}) => {
  const mutation = useMutation({
    ...config,
    mutationFn: updateBoxBrand,
  });

  return { ...mutation, updateBoxBrand: mutation.mutateAsync };
};
