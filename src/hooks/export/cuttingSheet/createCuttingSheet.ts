import { useMutation } from 'react-query';
import axios from '@/lib/axios';
import { MutationConfig } from '@/lib/react-query';
import { CuttingSheetType } from '../../../types/cuttingSheet';

interface CreateCuttingSheetResponse {
  cuttingSheetId: string;
  pdfUrl: string;
}

export const createCuttingSheet = (
  data: Partial<CuttingSheetType>
): Promise<CreateCuttingSheetResponse> => {
  return axios
    .post('/export/cutting-sheet', data)
    .then((response) => response.data);
};

type UseCreateCuttingSheetOptions = {
  config?: MutationConfig<typeof createCuttingSheet>;
};

export const useCreateCuttingSheet = ({
  config,
}: UseCreateCuttingSheetOptions = {}) => {
  const mutation = useMutation({
    ...config,
    mutationFn: createCuttingSheet,
  });

  return { ...mutation, createCuttingSheet: mutation.mutate };
};
