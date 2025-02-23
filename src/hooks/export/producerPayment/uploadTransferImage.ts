/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { AxiosResponse } from 'axios';
import { useMutation } from 'react-query';
import axios from '@/lib/axios';
import { MutationConfig } from '@/lib/react-query';

type UploadTransferImageDTO = {
  file: File;
  producerPaymentId: number;
  merchantId: number;
};

const uploadTransferImage = async ({
  file,
  producerPaymentId,
  merchantId,
}: UploadTransferImageDTO): Promise<AxiosResponse> => {
  const formData = new FormData();
  formData.append('file', file);

  try {
    return await axios.post(
      `/export/producer-payment/${producerPaymentId}/merchant/${merchantId}/transfer`,
      formData,
      { headers: { 'Content-Type': 'multipart/form-data' } }
    );
  } catch (error: any) {
    console.error(`Error: :'c =>`, error);
    if (error.response) {
      console.error('Response data:', error.response.data);
      console.error('Response status:', error.response.status);
    }
    throw error;
  }
};

type UseUploadTransferImageOptions = {
  config?: MutationConfig<typeof uploadTransferImage>;
};

export const useUploadTransferImage = ({
  config,
}: UseUploadTransferImageOptions = {}) => {
  const mutation = useMutation({
    ...config,
    mutationFn: uploadTransferImage,
  });

  return { ...mutation, uploadTransferImage: mutation.mutateAsync };
};
