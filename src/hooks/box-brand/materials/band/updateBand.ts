import { useMutation } from 'react-query';
import axios from '@/lib/axios';
import { MutationConfig } from '@/lib/react-query';
import { BandType } from '@/types/box-brand/materials/band';

type updateBandDTO = {
  data: Partial<BandType>;
  bandId: string;
};

const updateBand = ({ data, bandId }: updateBandDTO) => {
  return axios.post(`/box-brand/band/${bandId}`, data);
};

type UseUpdateBandOptions = {
  config?: MutationConfig<typeof updateBand>;
};

export const useUpdateBand = ({ config }: UseUpdateBandOptions = {}) => {
  const mutation = useMutation({
    ...config,
    mutationFn: updateBand,
  });

  return { ...mutation, updateBand: mutation.mutateAsync };
};
